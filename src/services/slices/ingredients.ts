import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  errorIngredientsText: SerializedError | null;
};

export const initialState: TIngredientsState = {
  isIngredientsLoading: true,
  ingredients: [],
  errorIngredientsText: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading,
    selectIngredients: (state) => state.ingredients,
    selectErrorIngredientsText: (state) => state.errorIngredientsText
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.errorIngredientsText = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.errorIngredientsText = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.errorIngredientsText = action.error;
      });
  }
});

export const {
  selectIsIngredientsLoading,
  selectIngredients,
  selectErrorIngredientsText
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
