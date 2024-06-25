import { configureStore } from '@reduxjs/toolkit'
import { booksReducer } from './books-slice'
import { bookReducer } from './book-slice'
import { cartReducer } from './cart-slice'

const createFavouritesAndCartInLocalStorage = (store) => (next) => (action) => {
  if (!localStorage.favourites) {
    localStorage.setItem('favourites', JSON.stringify([]))
  }

  if (!localStorage.cart) {
    localStorage.setItem('cart', JSON.stringify([]))
  }

  return next(action)
}

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createFavouritesAndCartInLocalStorage)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
