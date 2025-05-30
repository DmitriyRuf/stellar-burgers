import reducer from '../slices/ingredients';
import { getIngredients, initialState } from '../slices/ingredients';
import { testItemMockData } from '../mockData/testData';

describe('Проверка ingredientsSlice', () => {
  test('getIngredients.pending', () => {
    const state = reducer(initialState, getIngredients.pending('pending'));

    expect(state).toEqual({
      ...initialState,
      isIngredientsLoading: true,
      errorIngredientsText: null,
      ingredients: []
    });
  });

  test('getIngredients.fulfilled', () => {
    const state = reducer(
      initialState,
      getIngredients.fulfilled(testItemMockData, 'pending')
    );

    expect(state).toEqual({
      ...initialState,
      isIngredientsLoading: false,
      errorIngredientsText: null,
      ingredients: testItemMockData
    });
  });

  test('getIngredients.rejected', () => {
    const errorText = 'Ошибка загрузки данных';
    const state = reducer(
      initialState,
      getIngredients.rejected(new Error(errorText), 'rejected')
    );

    expect(state.errorIngredientsText?.message).toEqual(errorText);
    expect(state.isIngredientsLoading).toEqual(false);
    expect(state.ingredients).toHaveLength(0);
  });
});
