import { createSlice, nanoid } from "@reduxjs/toolkit";

// Ensure Recipe is initialized as an empty array
const initialState = {
  Recipe: [],  // Start with an empty array for Recipe
};

export const Slices = createSlice({
  name: "RecipeApp",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      // Ensure state.Recipe is always an array
      if (!Array.isArray(state.Recipe)) {
        state.Recipe = []; // Initialize as an empty array if it's not
      }

      const recipe = {
        id: nanoid(),
        picture: action.payload.picture,
        Title: action.payload.Title,
        Ingredients: action.payload.Ingredients,
        Description: action.payload.Description,
      };
      state.Recipe.push(recipe);
    },
    removeRecipe: (state, action) => {
      state.Recipe = state.Recipe.filter((recipe) => recipe.id !== action.payload);
    },
    updateRecipe: (state, action) => {
      const { id, update } = action.payload;
      console.log("Updating Recipe with Id =", id);
      console.log("Updates =", update);
      state.Recipe = state.Recipe.map((recipe) =>
        recipe.id === id ? { ...recipe, ...update } : recipe
      );
    },
    setRecipes: (state, action) => {
      return { ...state, Recipe: action.payload };  // Ensure we return the Recipe as an array
    },
  },
});

export const { addRecipe, removeRecipe, updateRecipe, setRecipes } = Slices.actions;
export default Slices.reducer;
