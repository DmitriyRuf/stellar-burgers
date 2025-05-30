import reducer from '../slices/feeds';
import { getFeeds, initialState } from '../slices/feeds';
import { testFeedsMockData } from '../mockData/testData';

describe('Проверка feedsSlice', () => {
  test('getFeeds.pending', () => {
    const state = reducer(initialState, getFeeds.pending('pending'));

    expect(state).toEqual({
      ...initialState,
      isFeedsLoading: true,
      errorFeeds: null,
      feeds: { orders: [], total: 0, totalToday: 0 }
    });
  });

  test('getFeeds.fulfilled', () => {
    const state = reducer(
      initialState,
      getFeeds.fulfilled(testFeedsMockData, 'pending')
    );

    expect(state).toEqual({
      ...initialState,
      isFeedsLoading: false,
      errorFeeds: null,
      feeds: testFeedsMockData
    });
  });

  test('getFeeds.rejected', () => {
    const errorText = 'Ошибка загрузки данных';

    const state = reducer(
      initialState,
      getFeeds.rejected(new Error(errorText), 'rejected')
    );

    expect(state.errorFeeds?.message).toEqual(errorText);
    expect(state.isFeedsLoading).toEqual(false);
    expect(state.feeds).toEqual({ orders: [], total: 0, totalToday: 0 });
  });
});
