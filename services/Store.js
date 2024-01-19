const store = {
  menu: null,
  cart: []
}

/** @type {ProxyHandler} */
const handler = {
  set(target, prop, newValue, receiver) {
    console.log('target:', target)
    console.log('prop:', prop)
    console.log('newValue:', newValue)
    console.log('receiver:', receiver)

    if (prop === "menu") {
      window.dispatchEvent(new Event("app-menu-changed"))
    }

    if (prop === "cart") {
      window.dispatchEvent(new Event("app-cart-changed"))
    }

    // alternative:
    // target[prop] = newValue
    // return true
    return Reflect.set(...arguments)
  }

}

const proxiedStore = new Proxy(store, handler)

export default proxiedStore