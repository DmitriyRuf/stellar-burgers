import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TLoginData,
  TRegisterData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';

type TUserState = {
  isUserLoading: boolean;
  isLogin: boolean;
  user: TUser;
  errorUser: SerializedError | null;
};

export const initialState: TUserState = {
  isUserLoading: true,
  isLogin: false,
  user: { name: '', email: '' },
  errorUser: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const getUser = createAsyncThunk('user/get', getUserApi);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData(state) {
      state.isUserLoading = false;
      state.errorUser = null;
      state.user = { name: '', email: '' };
    }
  },
  selectors: {
    selectIsLogin: (state) => state.isLogin,
    selectUser: (state) => state.user,
    selectIsUserLoading: (state) => state.isUserLoading,
    selectLoginError: (state) => state.errorUser
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isUserLoading = true;
        state.errorUser = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isLogin = true;
        state.errorUser = null;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.isLogin = false;
        state.errorUser = action.error;
        state.user = { name: '', email: '' };
      })
      .addCase(registerUser.pending, (state) => {
        state.isUserLoading = true;
        state.errorUser = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isUserLoading = false;
        state.isLogin = true;
        state.errorUser = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.isLogin = false;
        state.errorUser = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.isUserLoading = true;
        state.errorUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isLogin = true;
        state.errorUser = null;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.isLogin = false;
        state.errorUser = action.error;
        state.user = { name: '', email: '' };
      })
      .addCase(logout.pending, (state) => {
        state.isUserLoading = true;
        state.errorUser = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.errorUser = null;
        if (action.payload.success) {
          state.isLogin = false;
          state.user = { name: '', email: '' };
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.isUserLoading = false;
        state.errorUser = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUserLoading = true;
        state.errorUser = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.errorUser = null;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.errorUser = action.error;
      });
  }
});

export const {
  selectIsLogin,
  selectUser,
  selectLoginError,
  selectIsUserLoading
} = userSlice.selectors;

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
