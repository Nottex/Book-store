import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBooksState } from '../types/booksState'
import { requestNewBooks, requestSearchBooks } from '../services/books'
import { getFavouritesFromLocalStorage } from '../utils/getFavouritesFromLocalStorage'
import { setFavouritesToLocalSorage } from '../utils/setFavouritesToLocalStorage'
import { getCartFromLocalStorage } from '../utils/getCartFromLocalStorage'
import { setCartToLocalSorage } from '../utils/setCartToLocalStorage'
import { IBook, IFetchSearch } from '../types/interfaces'

// Thunks
export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async (_, { rejectWithValue }) => {
  try {
    return await requestNewBooks()
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

export const fetchSearchBooks = createAsyncThunk('books/fetchSearchBooks', async ({ query, page }: IFetchSearch, { rejectWithValue }) => {
  try {
    return await requestSearchBooks(query, page)
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

const initialState: IBooksState = {
  list: [],
  favourites: getFavouritesFromLocalStorage() || [],
  cart: getCartFromLocalStorage() || [],
  isLoading: false,
  error: null,
  pagesCount: null
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    toggleFavouriteById: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload

      const bookIndex = state.list.findIndex(book => book.id === bookId)

      const book = state.list[bookIndex]

      const indexBookFromFavourites = state.favourites.findIndex((element) => element.id === bookId)
      const isBookInFavourites = state.favourites.find((element) => element.id === bookId)

      if (isBookInFavourites) {
        state.favourites.splice(indexBookFromFavourites, 1)
      } else {
        state.list[bookIndex].isFavourite = !state.list[bookIndex].isFavourite
        state.favourites.push(book)
      }

      setFavouritesToLocalSorage(state.favourites)
    },
    addBookToCart: (state, action: PayloadAction<string | undefined>) => {
      const bookId = action.payload

      const bookIndex = state.list.findIndex(book => book.id === bookId)

      const bookItem = state.list[bookIndex]

      if (state.cart.length > 0) {
        const bookInCart = state.cart.find(book => book.id === bookId)

        if (bookInCart) {
          bookItem.inCart = true
        } else {
          bookItem.inCart = true
          state.cart.push(bookItem)
        }
      } else {
        bookItem.inCart = true
        state.cart.push(bookItem)
      }
      setCartToLocalSorage(state.cart)
    },
    removeBookFromCart: (state, action) => {
      const bookId = action.payload

      const bookIndex = state.cart.findIndex((book: IBook) => bookId === book.id)

      state.cart.splice(bookIndex, 1)
      setCartToLocalSorage(state.cart)
    },
    countIncrement: (state, action: PayloadAction<string | undefined>) => {
      state.cart = getCartFromLocalStorage()
      const bookId = action.payload

      const bookInCart = state.cart.find(book => book.id === bookId)

      if (bookInCart) {
        bookInCart.count = bookInCart.count + 1
      }

      setCartToLocalSorage(state.cart)
    },
    countDecrement: (state, action: PayloadAction<string | undefined>) => {
      state.cart = getCartFromLocalStorage()
      const bookId = action.payload

      const bookInCart = state.cart.find(book => book.id === bookId)
      const bookIndex = state.cart.findIndex(book => book.id === bookId)

      if (bookInCart && bookInCart.count > 1) {
        bookInCart.count = bookInCart.count - 1
      } else {
        state.cart.splice(bookIndex, 1)
      }

      setCartToLocalSorage(state.cart)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNewBooks.fulfilled, (state, action) => {
        state.isLoading = false

        state.list = action.payload.books.map((book: IBook) => {
          return {
            ...book,
            id: book.isbn13,
            isFavourite: state.favourites.find(elem => elem.id === book.id) ? true : false,
            inCart: state.cart.find(elem => elem.id === book.id) ? true : false,
            count: 1
          }
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

        state.list = action.payload.books.map((book: IBook) => {
          return {
            ...book,
            id: book.isbn13,
            isFavourite: state.favourites.find(elem => elem.id === book.id) ? true : false,
            inCart: state.cart.find(elem => elem.id === book.id) ? true : false,
            count: 1
          }
        })

        state.pagesCount = Math.ceil(action.payload.total / 10)
      })
      .addCase(fetchSearchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavouriteById, addBookToCart, countIncrement, countDecrement, removeBookFromCart } = booksSlice.actions

export const booksReducer = booksSlice.reducer
