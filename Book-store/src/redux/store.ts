import { configureStore } from '@reduxjs/toolkit'
import { booksReducer } from './books-slice'
import { bookReducer } from './book-slice'

const isArrayInLocalStorageExist = (store) => (next) => (action) => {
  if (localStorage.data) {
    next(action)
  } else {
    localStorage.setItem('data', JSON.stringify([]))
    return next(action)
  }
}

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(isArrayInLocalStorageExist)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
