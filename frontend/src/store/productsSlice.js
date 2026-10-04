import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { getState }) => api.getProducts(getState().products.filters)
);

export const saveProduct = createAsyncThunk(
  'products/save',
  async (product, { dispatch }) => {
    const { id, ...data } = product;
    if (id) await api.updateProduct(id, data);
    else await api.createProduct(data);
    dispatch(fetchProducts());
  }
);

export const removeProduct = createAsyncThunk(
  'products/remove',
  async (id, { dispatch }) => {
    await api.deleteProduct(id);
    dispatch(fetchProducts());
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    filters: { category: '', lowStockOnly: false },
    editing: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    startEdit(state, action) {
      state.editing = action.payload;
    },
    cancelEdit(state) {
      state.editing = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveProduct.fulfilled, (state) => {
        state.editing = null;
      })
      .addCase(saveProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setFilters, startEdit, cancelEdit, clearError } = productsSlice.actions;
export default productsSlice.reducer;
