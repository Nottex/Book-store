import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
    toggleFavouriteById: (state, action) => {
      const id = action.payload

      const index = state.list.findIndex((book) => book.id === id)

      state.list[index].isFavourite = !state.list[index].isFavourite

      // if(localStorage)
      // localStorage.setItem('data', JSON.stringify(state.list))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNewBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.books.map((book) => {
          return { ...book, id: book.isbn13, isFavourite: false }
        })
      })
      .addCase(fetchNewBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavouriteById } = booksSlice.actions

export const booksReducer = booksSlice.reducer
