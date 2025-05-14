import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerBuilderSlice from './slices/burger-builder';
import ingredientsSlice from './slices/ingredients';
import ordersSlice from './slices/orders';
import feedsSlice from './slices/feeds';
import userSlice from './slices/user';

export const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderSlice,
  ingredients: ingredientsSlice,
  orders: ordersSlice,
  feeds: feedsSlice,
  user: userSlice
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
