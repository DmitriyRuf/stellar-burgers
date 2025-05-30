import reducer from '../slices/burger-builder';
import { testItemData, testItemConstructor } from '../mockData/testData';

import {
  openModal,
  closeModal,
  clearIngredients,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  initialState
} from '../slices/burger-builder';

describe('Проверка burgerBuilderSlice', () => {
  test('Установка состояния открытого модального окна', () => {
    const state = reducer(initialState, openModal());

    expect(state.isModal).toEqual(true);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  test('Установка состояния закрытого модального окна', () => {
    const state = reducer(initialState, closeModal());

    expect(state.isModal).toEqual(false);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  test('Начальное состояние ингриентов конструктора', () => {
    const testState = {
      ingredients: [
        testItemConstructor.itemMain1,
        testItemConstructor.itemSauce,
        testItemConstructor.itemMain2
      ],
      bun: testItemData.itemBun,
      isModal: true
    };

    const state = reducer(testState, clearIngredients());

    expect(state.isModal).toEqual(true);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  test('Добавление булки', () => {
    const state = reducer(initialState, addIngredient(testItemData.itemBun));

    expect(state.bun).toEqual(testItemData.itemBun);
    expect(state.ingredients).toHaveLength(0);
    expect(state.isModal).toEqual(false);
  });

  test('Добавление ингридиента', () => {
    const state = reducer(initialState, addIngredient(testItemData.itemMain));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toEqual(testItemData.itemMain._id);
    expect(state.bun).toBeNull();
    expect(state.isModal).toEqual(false);
  });

  test('Удаление ингридиента', () => {
    const testState = {
      ingredients: [
        testItemConstructor.itemMain1,
        testItemConstructor.itemSauce,
        testItemConstructor.itemMain2
      ],
      bun: null,
      isModal: false
    };

    const state = reducer(
      testState,
      deleteIngredient(testItemConstructor.itemSauce)
    );

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients).toEqual([
      testItemConstructor.itemMain1,
      testItemConstructor.itemMain2
    ]);
    expect(state.bun).toBeNull();
    expect(state.isModal).toEqual(false);
  });

  test('Перемещение ингридиента вниз', () => {
    const testState = {
      ingredients: [
        testItemConstructor.itemMain1,
        testItemConstructor.itemSauce,
        testItemConstructor.itemMain2
      ],
      bun: null,
      isModal: false
    };

    const state = reducer(
      testState,
      moveIngredient({ ingredient: testItemConstructor.itemMain1, up: false })
    );

    expect(state.ingredients).toHaveLength(3);
    expect(state.ingredients[0]).toEqual(testItemConstructor.itemSauce);
    expect(state.ingredients[1]).toEqual(testItemConstructor.itemMain1);
    expect(state.ingredients[2]).toEqual(testItemConstructor.itemMain2);
    expect(state.bun).toBeNull();
    expect(state.isModal).toEqual(false);
  });

  test('Перемещение ингридиента вверх', () => {
    const testState = {
      ingredients: [
        testItemConstructor.itemMain1,
        testItemConstructor.itemSauce,
        testItemConstructor.itemMain2
      ],
      bun: null,
      isModal: false
    };

    const state = reducer(
      testState,
      moveIngredient({ ingredient: testItemConstructor.itemMain2, up: true })
    );

    expect(state.ingredients).toHaveLength(3);
    expect(state.ingredients[0]).toEqual(testItemConstructor.itemMain1);
    expect(state.ingredients[1]).toEqual(testItemConstructor.itemMain2);
    expect(state.ingredients[2]).toEqual(testItemConstructor.itemSauce);
    expect(state.bun).toBeNull();
    expect(state.isModal).toEqual(false);
  });
});
