import Input from './Input';
import { useForm } from 'react-hook-form';
import '../Styles/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, updateRecipe, setRecipes } from '../Store/Slices';
import { useState, useEffect } from 'react';

function AddRecipe() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();
  const RecipeData = useSelector((state) => state.Recipe);

  const recipeToEdit = RecipeData?.find((recipe) => recipe.id === id);

  console.log("RecipeData from Redux:", RecipeData);
  console.log("Route parameter ID:", id);
  console.log("Found recipeToEdit:", recipeToEdit);

  useEffect(() => {
    if (recipeToEdit) {
      reset({
        Title: recipeToEdit.Title,
        Ingredients: recipeToEdit.Ingredients,
        Description: recipeToEdit.Description,
      });
      setFile(recipeToEdit.picture || null);
    } else {
      // Reset form when there's no matching recipe
      reset({ Title: "", Ingredients: "", Description: "" });
      setFile(null);
    }
  }, [recipeToEdit, reset]);

  function HandleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const onSubmit = async (data) => {
    let picture = null;

    if (file && typeof file !== "string") {
      picture = await fileToBase64(file);
    } else if (typeof file === "string") {
      picture = file;
    }

    const payload = {
      id: id || Date.now().toString(),
      ...data,
      picture,
    };

    if (id) {
      dispatch(updateRecipe({ id, update: { ...payload } }));
    } else {
      dispatch(addRecipe(payload));
    }

    reset();
    setFile(null);
    navigate("/RecipeList");
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

// Local Storage
  useEffect(() => {
    const storedData = localStorage.getItem("RecipeData");

    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          dispatch(setRecipes(parsedData)); 
        } else {
          console.error("Stored data is not in the correct format. Resetting localStorage.");
          localStorage.removeItem("RecipeData");
        }
      }
    } catch (error) {
      console.error("Error parsing local storage data:", error);
      localStorage.removeItem("RecipeData"); // Clear invalid data
    }
  }, [dispatch]);

  useEffect(() => {
    if (RecipeData && Array.isArray(RecipeData)) {
      localStorage.setItem("RecipeData", JSON.stringify(RecipeData));
    }
  }, [RecipeData]);

  return (
    <div className="add-recipe-container">
      <form onSubmit={handleSubmit(onSubmit)} className="recipe-form">
        <h2 className="form-title">{id ? "Update Recipe" : "Add a New Recipe"}</h2>

        <Input
          name="Title"
          className="Recipe_Name"
          type="text"
          label="Add Recipe Title:"
          placeholder="Add Recipe Name or Title"
          {...register("Title", { required: true })}
        />

        <Input
          name="Description"
          label="Add Description"
          variant="textarea"
          rows="5"
          cols="30"
          placeholder="Enter a detailed description about the recipe"
          {...register("Description", { required: true })}
        />

        <Input
          name="Ingredients"
          type="text"
          label="Add Ingredients:"
          placeholder="Add Recipe Ingredients"
          {...register("Ingredients", { required: true })}
        />

        <Input
          name="Image"
          type="file"
          label="Add Image:"
          onChange={HandleFileChange}
        />

        {file && <p>Selected File: {typeof file === "string" ? "Existing Image" : file.name}</p>}

        <button type="submit" className="submit-button">
          {id ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
