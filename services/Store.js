const Store = {
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
    return Reflect.get(...arguments)
  }

}

const proxiedStore = new Proxy(store, handler)

export default handler