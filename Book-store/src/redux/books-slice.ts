import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IBooksState } from '../types/booksState'
import { requestNewBooks } from '../services/books'

// Thunks
// export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async (params = {}, { rejectWithValue }) => {
//   try {
//     const offset = (params.page - 1) * initialState.total
//     return await requestNewBooks({ total: initialState.total, offset, ...params })
//   } catch (e) {
//     return rejectWithValue(e.message)
//   }
// })

export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async (_, { rejectWithValue }) => {
  try {
    return await requestNewBooks()
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const initialState: IBooksState = {
  list: [],
  isLoading: false,
  error: null,
  total: 20
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNewBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.books.map((book) => {
          return { ...book, isFavorite: false }
        })
      })
      .addCase(fetchNewBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const booksReducer = booksSlice.reducer
