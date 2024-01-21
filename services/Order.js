import { getProductById } from "./Menu.js";

export async function addToCart(pId) {
  const productDetails = await getProductById(pId)

  const found = app.store.cart.findIndex(
    (inCart) => {
      return inCart.product.id == productDetails.id
    }
  )

  if (found != -1) {
    app.store.cart[found].quantity += 1
    app.store.cart = [...app.store.cart]
    return
  }

  app.store.cart = [...app.store.cart, { product: productDetails, quantity: 1 }]
  return
}

export async function removeFromCart(pId) {
  app.store.cart = app.store.cart.filter(p => p.product.id != pId)
}