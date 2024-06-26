import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IBooksState } from '../types/booksState'
import { requestNewBooks, requestSearchBooks } from '../services/books'
import { getFavouritesFromLocalStorage } from '../utils/getFavouritesFromLocalStorage'

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
  favourites: null,
  isLoading: false,
  error: null,
  pagesCount: null
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    toggleFavouriteById: (state, action) => {
      const bookId = action.payload

      const book = state.list.find((book) => book.id === bookId)
      const bookIndex = state.list.findIndex(book => book.id === bookId)

      state.list[bookIndex].isFavourite = !state.list[bookIndex].isFavourite
      book.isFavourite = !book.isFavourite

      const getFavouritesFromStorage = localStorage.getItem('favourites')
      const favouritesBooks = JSON.parse(getFavouritesFromStorage)

      if (favouritesBooks.length > 0) {
        const bookInFavourites = favouritesBooks.find(book => book.id === bookId)
        if (bookInFavourites) {
          const bookIndex = favouritesBooks.findIndex(book => book.id === bookId)

          favouritesBooks.splice(bookIndex, 1)

          localStorage.setItem('favourites', JSON.stringify(favouritesBooks))
        } else {
          favouritesBooks.push(state.list[bookIndex])
          localStorage.setItem('favourites', JSON.stringify(favouritesBooks))
        }
      } else {
        console.log(state.list[bookIndex])

        favouritesBooks.push(state.list[bookIndex])
        localStorage.setItem('favourites', JSON.stringify(favouritesBooks))
      }

      state.favourites = getFavouritesFromLocalStorage()
    },
    addBookToCart: (state) => {
      const getCartFromStorage = localStorage.getItem('cart')
      const cart = JSON.parse(getCartFromStorage)
      console.log(state.data)

      if (cart.length > 0) {
        const bookInCart = cart.find(book => book.id === state.data.id)
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

      const getCartFromStorage = localStorage.getItem('cart')
      const cart = JSON.parse(getCartFromStorage)

      const book = cart.find(book => bookId === book.id)
      book.inCart = false
      const bookIndex = cart.findIndex(book => bookId === book.id)

      cart.splice(bookIndex, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      state.list[bookIndex].inCart = false
      setTimeout(() => {
        console.log(state.list)
      }, 1000)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNewBooks.fulfilled, (state, action) => {
        state.isLoading = false

        if (state.list.length > 0) {
          state.list = state.list.books.map(book => book)
        } else {
          state.list = action.payload.books.map((book) => {
            return { ...book, id: book.isbn13, isFavourite: false, inCart: false }
          })
        }
        // state.list = action.payload.books.map((book) => {
        //   return { ...book, id: book.isbn13, isFavourite: false, inCart: false }
        // })

        console.log(state.list)
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
          return { ...book, id: book.isbn13, isFavourite: false, inCart: false }
        })
        state.pagesCount = Math.ceil(action.payload.total / 10)
      })
      .addCase(fetchSearchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavouriteById, removeBookFromCart, addBookToCart } = booksSlice.actions

export const booksReducer = booksSlice.reducer
