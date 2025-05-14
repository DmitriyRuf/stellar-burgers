import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TAppState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
  isModal: boolean;
};

export const initialState: TAppState = {
  ingredients: [],
  bun: null,
  isModal: false
};

const BurgerBuilderSlice = createSlice({
  name: 'burgerBuilder',
  initialState,
  reducers: {
    openModal(state) {
      state.isModal = true;
    },
    closeModal(state) {
      state.isModal = false;
    },
    clearIngredients(state) {
      state.ingredients = [];
      state.bun = null;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload, id: uuidv4() });
      }
    },
    deleteIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        up: boolean;
      }>
    ) {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload.ingredient.id
      );
      const ingredient = state.ingredients[index];

      if (action.payload.up && index) {
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = ingredient;
      } else {
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = ingredient;
      }
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBun: (state) => state.bun,
    selectIsModal: (state) => state.isModal
  }
});

export const { selectIngredients, selectBun, selectIsModal } =
  BurgerBuilderSlice.selectors;

export const {
  openModal,
  closeModal,
  clearIngredients,
  addIngredient,
  deleteIngredient,
  moveIngredient
} = BurgerBuilderSlice.actions;

export default BurgerBuilderSlice.reducer;
