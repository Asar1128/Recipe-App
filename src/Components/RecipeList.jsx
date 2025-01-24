import { useSelector  , useDispatch} from "react-redux";
import { updateRecipe , removeRecipe } from "../Store/Slices";
import "../Styles/index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeList() {
  const RecipeData = useSelector((state) => state.Recipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(RecipeData);
   
  const HandleUpdateRecipe = (recipe) => {
    navigate(`/Add Recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-container">
      <h1 className="recipe-heading">Recipe List</h1>
      <ul className="recipe-list">
        {RecipeData && RecipeData.length > 0 ? (
          RecipeData.map((recipe) => (
            <li key={recipe.id} className="recipe-card">
              <img
                src={recipe.picture || "https://via.placeholder.com/150"}
                alt={recipe.Title || "No image available"}
                className="recipe-image"
              />
              <div className="recipe-content">
                <h2 className="recipe-title">
                  {recipe.Title || "Untitled Recipe"}
                </h2>
                <p className="recipe-ingredients">
                  <strong>Ingredients:</strong> {recipe.Ingredients || "N/A"}
                </p>
                <p className="recipe-description">
                  <strong>Description:</strong>{" "}
                  {recipe.Description || "No description available"}
                </p>
              </div>
              <hr />
              {/* Buttons */}
              <div className="Recipe_btns">
                <button 
                className="recipe-button recipe-button-primary"
                onClick={()=>HandleUpdateRecipe(recipe)}>
                  Update Recipe
                </button>
                <button 
                className="recipe-button recipe-button-secondary"
                onClick={()=>dispatch(removeRecipe(recipe.id))}
                >
                  Delete Recipe
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="recipe-no-data">No recipes available</p>
        )}
      </ul>
    </div>
  );
}

export default RecipeList;
