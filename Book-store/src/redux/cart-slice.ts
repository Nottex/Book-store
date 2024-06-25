import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartValue: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { setCartValue } = cartSlice.actions

export const cartReducer = cartSlice.reducer
