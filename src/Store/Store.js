import { configureStore } from '@reduxjs/toolkit';
import RecipeSlices from './Slices';

export const Store = configureStore({
  reducer: RecipeSlices,
});
