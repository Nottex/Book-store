export function getCartFromLocalStorage () {
  const cart = localStorage.getItem('cart')

  if (!cart) return null

  return JSON.parse(cart)
}
