import Store from "./services/Store.js"
import { loadData } from "./services/Menu.js"
import Router from "./services/Router.js"

/**
 * Components
 * Need to link for the browser understand what is happening
 */
import { MenuPage } from "./components/MenuPage.js"
import { OrderPage } from "./components/OrderPage.js"
import { DetailsPage } from "./components/DetailsPage.js"
import { ProductItem } from "./components/ProductItem.js"
import { CartItem } from "./components/CartItem.js"


/**
 * Global state
 */
window.app = {}
app.store = Store
app.router = Router

window.addEventListener("DOMContentLoaded", function (event) {
  loadData()
  app.router.init()
})

window.addEventListener("app-cart-changed", function (event) {
  const badge = document.getElementById('badge');
  const qtd = app.store.cart.reduce((acc, item) => acc + item.quantity, 0)

  badge.textContent = qtd
  badge.hidden = qtd === 0
})