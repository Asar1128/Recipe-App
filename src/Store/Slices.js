import { createSlice, nanoid } from "@reduxjs/toolkit";

// Initialize state from localStorage or default to an empty array
const initialState = {
  Recipe: JSON.parse(localStorage.getItem("recipes")) || [],
};

export const Slices = createSlice({
  name: "RecipeApp",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const recipe = {
        id: nanoid(),
        picture: action.payload.picture,
        Title: action.payload.Title,
        Ingredients: action.payload.Ingredients,
        Description: action.payload.Description,
      };
      state.Recipe.push(recipe);

      // Update localStorage
      localStorage.setItem("recipes", JSON.stringify(state.Recipe));
    },
    removeRecipe: (state, action) => {
      state.Recipe = state.Recipe.filter((recipe) => recipe.id !== action.payload);

      // Update localStorage
      localStorage.setItem("recipes", JSON.stringify(state.Recipe));
    },
    updateRecipe: (state, action) => {
      const { id, update } = action.payload;
      state.Recipe = state.Recipe.map((recipe) =>
        recipe.id === id ? { ...recipe, ...update } : recipe
      );

      // Update localStorage
      localStorage.setItem("recipes", JSON.stringify(state.Recipe));
    },
    setRecipes: (state, action) => {
      state.Recipe = action.payload;

      // Update localStorage
      localStorage.setItem("recipes", JSON.stringify(state.Recipe));
    },
  },
});

export const { addRecipe, removeRecipe, updateRecipe, setRecipes } = Slices.actions;
export default Slices.reducer;
