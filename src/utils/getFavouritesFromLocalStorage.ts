export function getFavouritesFromLocalStorage () {
  const favourites = localStorage.getItem('favourites')

  if (!favourites) return null

  return JSON.parse(favourites)
}
