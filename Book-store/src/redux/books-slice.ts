import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IBooksState } from '../types/booksState'
import { requestNewBooks, requestSearchBooks } from '../services/books'

// Thunks

export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async (_, { rejectWithValue }) => {
  try {
    return await requestNewBooks()
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchSearchBooks = createAsyncThunk('books/fetchSearchBooks', async ({ query, page }, { rejectWithValue }) => {
  try {
    return await requestSearchBooks(query, page)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const initialState: IBooksState = {
  list: [],
  isLoading: false,
  error: null,
  pagesCount: null
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
      .addCase(fetchSearchBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSearchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload.books.map((book) => {
          return { ...book, id: book.isbn13, isFavourite: false }
        })
        state.pagesCount = Math.ceil(action.payload.total / 10)
      })
      .addCase(fetchSearchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavouriteById } = booksSlice.actions

export const booksReducer = booksSlice.reducer
