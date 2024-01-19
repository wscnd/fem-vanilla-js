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