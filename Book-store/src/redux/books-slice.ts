import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IBookState } from '../types/booksState'

const initialState: IBookState = {
  list: []
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {

  }
})

export const booksReducer = booksSlice.reducer
