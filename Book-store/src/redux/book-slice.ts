import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBook } from '../services/books'
import { getCartFromLocalStorage } from '../utils/getCartFromLocalStorage'
import { IBookState } from '../types/booksState'
import { IBook } from '../types/interfaces'

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
  reducers: {
    toggleFavourite: (state) => {
      state.data.isFavourite = !state.data.isFavourite

      const getFavouritesFromStorage = localStorage.getItem('favourites')!
      const favouritesBooks = JSON.parse(getFavouritesFromStorage)

      if (favouritesBooks.length > 0) {
        const bookInFavourites = favouritesBooks.find((book: IBook) => book.id === state.data.id)
        if (bookInFavourites) {
          const bookId = favouritesBooks.findIndex((book: IBook) => book.id === state.data.id)

          favouritesBooks.splice(bookId, 1)

          localStorage.setItem('favourites', JSON.stringify(favouritesBooks))
        } else {
          favouritesBooks.push(state.data)
          localStorage.setItem('favourites', JSON.stringify(favouritesBooks))
        }
      } else {
        favouritesBooks.push(state.data)
        localStorage.setItem('favourites', JSON.stringify(favouritesBooks))
      }
    },
    addBookToCart: (state) => {
      const getCartFromStorage = localStorage.getItem('cart')!
      const cart = JSON.parse(getCartFromStorage)

      if (cart.length > 0) {
        const bookInCart = cart.find((book: IBook) => book.id === state.data.id)
        if (bookInCart) {
          state.data.inCart = true
        } else {
          state.data.inCart = true
          cart.push(state.data)
          localStorage.setItem('cart', JSON.stringify(cart))
        }
      } else {
        state.data.inCart = true
        cart.push(state.data)
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    },
    removeBookFromCart: (state, action) => {
      const bookId = action.payload

      const getCartFromStorage = localStorage.getItem('cart')!
      const cart = JSON.parse(getCartFromStorage)

      const bookIndex = cart.findIndex((book: IBook) => bookId === book.id)

      state.data.inCart = false
      cart.splice(bookIndex, 1)
      localStorage.setItem('cart', JSON.stringify(cart))

      state.cart = getCartFromLocalStorage()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = { ...action.payload, id: action.payload.isbn13, isFavourite: false, inCart: false, count: 1 }

        const getFavouritesFromStorage = localStorage.getItem('favourites')!
        const favouritesBooks = JSON.parse(getFavouritesFromStorage)

        if (favouritesBooks.length > 0) {
          const bookInFavourites = favouritesBooks.find((book: IBook) => book.id === state.data.id)

          if (bookInFavourites) {
            state.data.isFavourite = true
          }
        }

        const getCartFromStorage = localStorage.getItem('cart')!
        const cart = JSON.parse(getCartFromStorage)

        if (cart.length > 0) {
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

export const { toggleFavourite, addBookToCart, removeBookFromCart } = bookSlice.actions

export const bookReducer = bookSlice.reducer
