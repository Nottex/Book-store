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
  info: string | undefined,
  price: string,
  isFavourite?: boolean,
  rating?: string,
  favouritePage?: string,
  count?: number | undefined,
  subtitle?: string
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
  error: string | undefined,
  desc: string,
  publisher: string
  year: string,
  pages: string,
  count: number
}

export interface IPagination {
  route: string,
}

export interface IFetchSearch {
  page: string | number,
  query: string | undefined
}
