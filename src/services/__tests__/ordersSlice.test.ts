import reducer from '../slices/orders';
import { testFeedsMockData } from '../mockData/testData';
import {
  getOrder,
  getOrders,
  addOrder,
  initialState,
  clearOrderRequest
} from '../slices/orders';

describe('Проверка ordersSlice', () => {
  test('Начальное состояние заказа', () => {
    const testState = {
      isOrdersLoading: true,
      isOrderLoading: true,
      orderRequest: true,
      orderModalData: testFeedsMockData.orders[0],
      orders: [],
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    };

    const state = reducer(testState, clearOrderRequest());

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: true,
      isOrderLoading: true,
      orderRequest: false,
      orderModalData: null,
      orders: [],
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('getOrders.pending', () => {
    const state = reducer(initialState, getOrders.pending('pending'));

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: true,
      isOrderLoading: true,
      orderRequest: false,
      orderModalData: null,
      orders: [],
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('getOrders.fulfilled', () => {
    const state = reducer(
      initialState,
      getOrders.fulfilled(testFeedsMockData.orders, 'fulfilled')
    );

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: false,
      isOrderLoading: true,
      orderRequest: false,
      orderModalData: null,
      orders: testFeedsMockData.orders,
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('getOrders.rejected', () => {
    const errorText = 'Ошибка загрузки данных';

    const state = reducer(
      initialState,
      getOrders.rejected(new Error(errorText), 'rejected')
    );

    expect(state.isOrdersLoading).toEqual(false);
    expect(state.isOrderLoading).toEqual(true);
    expect(state.orderRequest).toEqual(false);
    expect(state.orderModalData).toBeNull();
    expect(state.orders).toHaveLength(0);
    expect(state.order).toBeNull();
    expect(state.errorOrdersText?.message).toEqual(errorText);
    expect(state.errorOrderText).toBeNull();
  });

  test('getOrder.pending', () => {
    const state = reducer(
      initialState,
      getOrder.pending('pending', testFeedsMockData.orders[1].number)
    );

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: true,
      isOrderLoading: true,
      orderRequest: false,
      orderModalData: null,
      orders: [],
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('getOrder.fulfilled', () => {
    const state = reducer(
      initialState,
      getOrder.fulfilled(
        testFeedsMockData.orders[1],
        'fulfilled',
        testFeedsMockData.orders[1].number
      )
    );

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: true,
      isOrderLoading: false,
      orderRequest: false,
      orderModalData: null,
      orders: [],
      order: testFeedsMockData.orders[1],
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('getOrder.rejected', () => {
    const errorText = 'Ошибка загрузки данных';

    const state = reducer(
      initialState,
      getOrder.rejected(new Error(errorText), 'rejected', 0)
    );

    expect(state.isOrdersLoading).toEqual(true);
    expect(state.isOrderLoading).toEqual(false);
    expect(state.orderRequest).toEqual(false);
    expect(state.orderModalData).toBeNull();
    expect(state.orders).toHaveLength(0);
    expect(state.order).toBeNull();
    expect(state.errorOrdersText).toBeNull();
    expect(state.errorOrderText?.message).toEqual(errorText);
  });

  test('addOrder.pending', () => {
    const state = reducer(
      initialState,
      addOrder.pending('pending', testFeedsMockData.orders[2].ingredients)
    );

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: true,
      isOrderLoading: true,
      orderRequest: true,
      orderModalData: null,
      orders: [],
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('addOrder.fulfilled', () => {
    const state = reducer(
      initialState,
      addOrder.fulfilled(
        {
          order: testFeedsMockData.orders[2],
          name: 'TEST_ORDER',
          success: true
        },
        'fulfilled',
        testFeedsMockData.orders[2].ingredients
      )
    );

    expect(state).toEqual({
      ...initialState,
      isOrdersLoading: true,
      isOrderLoading: true,
      orderRequest: false,
      orderModalData: testFeedsMockData.orders[2],
      orders: [],
      order: null,
      errorOrdersText: null,
      errorOrderText: null
    });
  });

  test('addOrder.rejected', () => {
    const errorText = 'Ошибка загрузки данных';

    const state = reducer(
      initialState,
      addOrder.rejected(new Error(errorText), 'rejected', [])
    );

    expect(state.isOrdersLoading).toEqual(true);
    expect(state.isOrderLoading).toEqual(true);
    expect(state.orderRequest).toEqual(false);
    expect(state.orderModalData).toBeNull();
    expect(state.orders).toHaveLength(0);
    expect(state.order).toBeNull();
    expect(state.errorOrdersText).toBeNull();
    expect(state.errorOrderText?.message).toEqual(errorText);
  });
});
