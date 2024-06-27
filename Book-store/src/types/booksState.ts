import { IBook } from './interfaces'

export interface IBooksState {
  list: IBook[],
  favourites: IBook[],
  cart: IBook[],
  isLoading: boolean,
  error: string | undefined | null,
  pagesCount: null | number
}

export interface IBookState {
  data: object,
  cart: [],
  isLoading: boolean,
  error: null,
}
