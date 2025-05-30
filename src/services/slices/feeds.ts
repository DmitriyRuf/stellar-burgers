import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

type TFeedsState = {
  isFeedsLoading: boolean;
  feeds: TOrdersData;
  errorFeeds: SerializedError | null;
};

export const initialState: TFeedsState = {
  isFeedsLoading: true,
  feeds: { orders: [], total: 0, totalToday: 0 },
  errorFeeds: null
};

export const getFeeds = createAsyncThunk<TOrdersData>('feeds/get', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectIsFeedsLoading: (state) => state.isFeedsLoading,
    selectFeeds: (state) => state.feeds,
    selectErrorFeedsText: (state) => state.errorFeeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
        state.errorFeeds = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.feeds = {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
        state.errorFeeds = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.errorFeeds = action.error;
      });
  }
});

export const { selectIsFeedsLoading, selectFeeds, selectErrorFeedsText } =
  feedsSlice.selectors;

export default feedsSlice.reducer;
