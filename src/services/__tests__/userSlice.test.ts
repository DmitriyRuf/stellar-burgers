import reducer from '../slices/user';
import {
  testLoginMockData,
  testTokenMockData,
  testUserMockData,
  testRegisterMockData
} from '../mockData/testData';
import {
  clearUserData,
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  initialState
} from '../slices/user';

describe('Проверка userSlice', () => {
  test('Начальное состояние данных пользователя', () => {
    const errorText = 'Ошибка загрузки данных';

    const testState = {
      isUserLoading: true,
      isLogin: false,
      user: testUserMockData,
      errorUser: new Error(errorText)
    };

    const state = reducer(testState, clearUserData());

    expect(state).toEqual({
      ...initialState,
      isUserLoading: false,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('registerUser.pending', () => {
    const state = reducer(
      initialState,
      registerUser.pending('pending', testRegisterMockData)
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: true,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('registerUser.fulfilled', () => {
    const state = reducer(
      initialState,
      registerUser.fulfilled(
        {
          success: true,
          refreshToken: testTokenMockData.refreshToken,
          accessToken: testTokenMockData.accessToken,
          user: testUserMockData
        },
        'fulfilled',
        testRegisterMockData
      )
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: false,
      isLogin: true,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('registerUser.rejected', () => {
    const errorText = 'Ошибка регистрации';

    const state = reducer(
      initialState,
      registerUser.rejected(
        new Error(errorText),
        'rejected',
        testRegisterMockData
      )
    );

    expect(state.isUserLoading).toEqual(false);
    expect(state.isLogin).toEqual(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.errorUser?.message).toEqual(errorText);
  });

  test('loginUser.pending', () => {
    const state = reducer(
      initialState,
      loginUser.pending('pending', testLoginMockData)
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: true,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('loginUser.fulfilled', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(
        {
          success: true,
          refreshToken: testTokenMockData.refreshToken,
          accessToken: testTokenMockData.accessToken,
          user: testUserMockData
        },
        'fulfilled',
        testLoginMockData
      )
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: false,
      isLogin: true,
      user: testUserMockData,
      errorUser: null
    });
  });

  test('loginUser.rejected', () => {
    const errorText = 'Ошибка регистрации';

    const state = reducer(
      initialState,
      loginUser.rejected(new Error(errorText), 'rejected', testLoginMockData)
    );

    expect(state.isUserLoading).toEqual(false);
    expect(state.isLogin).toEqual(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.errorUser?.message).toEqual(errorText);
  });

  test('logout.pending', () => {
    const state = reducer(initialState, logout.pending('pending'));

    expect(state).toEqual({
      ...initialState,
      isUserLoading: true,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('logout.fulfilled', () => {
    const state = reducer(
      initialState,
      logout.fulfilled({ success: true }, 'fulfilled')
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: false,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('logout.rejected', () => {
    const errorText = 'Ошибка выхода';

    const state = reducer(
      initialState,
      logout.rejected(new Error(errorText), 'rejected')
    );

    expect(state.isUserLoading).toEqual(false);
    expect(state.isLogin).toEqual(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.errorUser?.message).toEqual(errorText);
  });

  test('getUser.pending', () => {
    const state = reducer(initialState, getUser.pending('pending'));

    expect(state).toEqual({
      ...initialState,
      isUserLoading: true,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('getUser.fulfilled', () => {
    const state = reducer(
      initialState,
      getUser.fulfilled({ success: true, user: testUserMockData }, 'fulfilled')
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: false,
      isLogin: true,
      user: testUserMockData,
      errorUser: null
    });
  });

  test('getUser.rejected', () => {
    const errorText = 'Ошибка получения данных пользователя';

    const state = reducer(
      initialState,
      getUser.rejected(new Error(errorText), 'rejected')
    );

    expect(state.isUserLoading).toEqual(false);
    expect(state.isLogin).toEqual(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.errorUser?.message).toEqual(errorText);
  });

  test('updateUser.pending', () => {
    const state = reducer(
      initialState,
      updateUser.pending('pending', testRegisterMockData)
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: true,
      isLogin: false,
      user: { name: '', email: '' },
      errorUser: null
    });
  });

  test('updateUser.fulfilled', () => {
    const state = reducer(
      initialState,
      updateUser.fulfilled(
        { success: true, user: testUserMockData },
        'fulfilled',
        testRegisterMockData
      )
    );

    expect(state).toEqual({
      ...initialState,
      isUserLoading: false,
      isLogin: false,
      user: testUserMockData,
      errorUser: null
    });
  });

  test('updateUser.rejected', () => {
    const errorText = 'Ошибка обновления данных пользователя';

    const state = reducer(
      initialState,
      updateUser.rejected(
        new Error(errorText),
        'rejected',
        testRegisterMockData
      )
    );

    expect(state.isUserLoading).toEqual(false);
    expect(state.isLogin).toEqual(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.errorUser?.message).toEqual(errorText);
  });
});
