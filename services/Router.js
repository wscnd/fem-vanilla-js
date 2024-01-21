const Router = {
  init: function () {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", event => {
        event.preventDefault()
        this.go(event.target.getAttribute("href"))
      })

    })

    // go back button
    window.addEventListener("popstate", (e) => {
      this.go(e.state.route, false)
    });

    // deep linking
    this.go(location.pathname)
  },

  /**
   * @param {string} route
   */
  go: (route, addToHistory = true) => {
    console.log(`Router: Going to ${route}`)

    if (addToHistory) {
      history.pushState({ route }, "", route)
    }

    /** @type {HTMLElement} */
    let pageElement

    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page")
        break

      case "/order":
        pageElement = document.createElement("order-page")
        break

      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page")
          const paramId = route.slice(route.lastIndexOf("-") + 1)
          pageElement.dataset.productId = paramId
        }
        break
    }

    if (pageElement != undefined) {
      const cache = document.querySelector("main")
      cache.innerHTML = ""
      cache.appendChild(pageElement)

      window.scrollX = 0
      window.scrollY = 0
    }
  },
}

export default Router
