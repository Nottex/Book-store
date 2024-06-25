import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestBook } from '../services/books'

export const fetchBook = createAsyncThunk('book/fetchBook', async (id, { rejectWithValue }) => {
  try {
    return await requestBook(id)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const initialState = {
  data: {},
  isLoading: false,
  error: null
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleFavourite: (state) => {
      state.data.isFavourite = !state.data.isFavourite

      const getFavouritesFromStorage = localStorage.getItem('favourites')
      const favouritesBooks = JSON.parse(getFavouritesFromStorage)

      if (favouritesBooks.length > 0) {
        const bookInFavourites = favouritesBooks.find(book => book.id === state.data.id)
        if (bookInFavourites) {
          const bookId = favouritesBooks.findIndex(book => book.id === state.data.id)

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
    addToCart: (state) => {
      const getCartFromStorage = localStorage.getItem('cart')
      const cart = JSON.parse(getCartFromStorage)

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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = { ...action.payload, id: action.payload.isbn13, isFavourite: false, inCart: false }

        const getFavouritesFromStorage = localStorage.getItem('favourites')
        const favouritesBooks = JSON.parse(getFavouritesFromStorage)

        if (favouritesBooks.length > 0) {
          const bookInFavourites = favouritesBooks.find(book => book.id === state.data.id)

          if (bookInFavourites) {
            state.data.isFavourite = true
          }
        }

        const getCartFromStorage = localStorage.getItem('cart')
        const cart = JSON.parse(getCartFromStorage)

        if (cart.length > 0) {
          const bookInCart = cart.find(book => book.id === state.data.id)

          if (bookInCart) {
            state.data.inCart = true
            console.log(state.data.inCart)
          } else {
            console.log('нет в корзине')
          }
        }
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavourite, addToCart } = bookSlice.actions

export const bookReducer = bookSlice.reducer
