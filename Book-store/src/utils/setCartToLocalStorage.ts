export function setCartToLocalSorage (cartList) {
  localStorage.setItem('cart', JSON.stringify(cartList))
}
