import { rootReducer, store } from '../store';

describe('rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const testState = store.getState();

    expect(testState).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
