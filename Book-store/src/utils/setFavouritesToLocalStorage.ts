export function setFavouritesToLocalSorage (favouritesList) {
  localStorage.setItem('favourites', JSON.stringify(favouritesList))
}
