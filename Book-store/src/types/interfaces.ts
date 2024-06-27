export interface IBookCard {
  id: string | undefined,
  image: string,
  title: string,
  info: string,
  price: string,
  isbn13?: string,
}

export interface IBookSmallCard {
  id: string | undefined,
  image: string,
  title: string,
  info: string,
  price: string,
  isFavourite?: boolean,
  rating?: string
}

export interface IBook {
  id: string | undefined,
  image: string,
  title: string,
  info: string,
  price: string,
  isbn13?: string,
  authors?: string,
  subtitle: string,
  rating?: string,
  isFavourite: boolean,
  inCart: boolean,
  error: string | undefined
}

export interface IPagination {
  route: string,
}

export interface IFetchSearch {
  page: string | number,
  query: string | undefined
}
