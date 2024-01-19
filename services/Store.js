const store = {
  menu: null,
  cart: []
}

/** @type {ProxyHandler} */
const handler = {
  set(target, prop, newValue, receiver) {
    // if you change the value before calling the dispatch event
    // it will send the event but the values wil not be available

    target[prop] = newValue
    if (prop === "menu") {
      // has to be window and not the document bc of the shadow doms
      window.dispatchEvent(new Event("app-menu-changed"))
    }

    if (prop === "cart") {
      window.dispatchEvent(new Event("app-cart-changed"))
    }

    // alternative:
    // target[prop] = newValue
    // return true
    //
    return Reflect.set(...arguments)
  }

}

/** @type {typeof store} */
const proxiedStore = new Proxy(store, handler)

export default proxiedStore