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

      const dataArrayFromStorage = localStorage.getItem('data')
      const booksFromStorage = JSON.parse(dataArrayFromStorage)

      if (booksFromStorage.length > 0) {
        const asd = booksFromStorage.find(book => book.id === state.data.id)
        if (asd) {
          return
        } else {
          console.log('не нашло')

          booksFromStorage.push(state.data)
          localStorage.setItem('data', JSON.stringify(booksFromStorage))
        }
      } else {
        booksFromStorage.push(state.data)
        localStorage.setItem('data', JSON.stringify(booksFromStorage))
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
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { toggleFavourite } = bookSlice.actions

export const bookReducer = bookSlice.reducer
