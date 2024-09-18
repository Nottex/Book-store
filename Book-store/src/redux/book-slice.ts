import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBook } from '../services/books'
import { getCartFromLocalStorage } from '../utils/getCartFromLocalStorage'
import { IBookState } from '../types/booksState'
import { IBook } from '../types/interfaces'
import { getFavouritesFromLocalStorage } from '../utils/getFavouritesFromLocalStorage'

export const fetchBook = createAsyncThunk('book/fetchBook', async (id: string | undefined, { rejectWithValue }) => {
  try {
    return await requestBook(id)
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

const initialState: IBookState = {
  data: {} as IBook,
  isLoading: false,
  cart: [],
  error: null
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = { ...action.payload, id: action.payload.isbn13, isFavourite: false, inCart: false, count: 1 }

        const favouritesBooks = getFavouritesFromLocalStorage()

        if (favouritesBooks && favouritesBooks.length > 0) {
          const bookInFavourites = favouritesBooks.find((book: IBook) => book.id === state.data.id)

          if (bookInFavourites) {
            state.data.isFavourite = true
          }
        }

        const cart = getCartFromLocalStorage()

        if (cart && cart.length > 0) {
          const bookInCart = cart.find((book: IBook) => book.id === state.data.id)

          if (bookInCart) {
            state.data.inCart = true
          }
        }
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const bookReducer = bookSlice.reducer
