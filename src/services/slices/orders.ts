import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi, orderBurgerApi } from '@api';

type TOrdersState = {
  isOrdersLoading: boolean;
  isOrderLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
  order: TOrder | null;
  errorOrdersText: SerializedError | null;
  errorOrderText: SerializedError | null;
};

export const initialState: TOrdersState = {
  isOrdersLoading: true,
  isOrderLoading: true,
  orderRequest: false,
  orderModalData: null,
  orders: [],
  order: null,
  errorOrdersText: null,
  errorOrderText: null
};

export const getOrders = createAsyncThunk('orders/getAll', getOrdersApi);

export const getOrder = createAsyncThunk(
  'orders/get',
  async (data: number) =>
    await getOrderByNumberApi(data)
      .then((orderData) => orderData.orders[0])
      .catch(() => null)
);

export const addOrder = createAsyncThunk(
  'orders/add',
  async (data: string[]) => await orderBurgerApi(data)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectIsOrdersLoading: (state) => state.isOrdersLoading,
    selectIsOrderLoading: (state) => state.isOrderLoading,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrders: (state) => state.orders,
    selectOrder: (state) => state.order,
    selectErrorOrdersText: (state) => state.errorOrdersText,
    selectErrorOrderText: (state) => state.errorOrderText
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.errorOrdersText = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload;
        state.errorOrdersText = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.errorOrdersText = action.error;
      })
      .addCase(getOrder.pending, (state) => {
        state.isOrderLoading = true;
        state.errorOrderText = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.errorOrderText = null;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.errorOrderText = action.error;
      })
      .addCase(addOrder.pending, (state) => {
        state.orderRequest = true;
        state.errorOrderText = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.errorOrderText = null;
        state.orderModalData = action.payload.order;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.errorOrdersText = action.error;
      });
  }
});

export const {
  selectIsOrdersLoading,
  selectIsOrderLoading,
  selectOrderRequest,
  selectOrderModalData,
  selectOrders,
  selectOrder,
  selectErrorOrdersText,
  selectErrorOrderText
} = ordersSlice.selectors;

export const { clearOrderRequest } = ordersSlice.actions;

export default ordersSlice.reducer;
