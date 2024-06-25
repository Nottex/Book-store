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
      // localStorage.setItem('cart', JSON.stringify(state.list))
    }
  }
})

export const { setCartValue } = cartSlice.actions

export const cartReducer = cartSlice.reducer
