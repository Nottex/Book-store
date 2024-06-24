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
        const bookExistInLocalStorage = favouritesBooks.find(book => book.id === state.data.id)
        if (bookExistInLocalStorage) {
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = { ...action.payload, id: action.payload.isbn13, isFavourite: false }

        const getFavouritesFromStorage = localStorage.getItem('favourites')
        const favouritesBooks = JSON.parse(getFavouritesFromStorage)

        if (favouritesBooks.length > 0) {
          console.log(state.data.id)

          const bookExistInLocalStorage = favouritesBooks.find(book => book.id === state.data.id)
          if (bookExistInLocalStorage) {
            state.data.isFavourite = true
            console.log(state.data.isFavourite)
          } else {
            return
          }
        }
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavourite } = bookSlice.actions

export const bookReducer = bookSlice.reducer
