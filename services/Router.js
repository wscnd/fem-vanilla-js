const Router = {
  init: function () {
    document.querySelectorAll("a.navlink").forEach(a => {

      a.addEventListener("click", event => {
        event.preventDefault()
        this.go(event.target.getAttribute("href"))
      })

    })
    // go back button
    window.addEventListener("popstate", function (e) {
      this.go(e.state.route, false)
    });

    // deep linking
    Router.go(location.pathname)
  },

  /**
   * @param {string} route
   * @param {boolean} addToHistory
   */
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`)

    if (addToHistory) {
      history.pushState({ route }, null, route)
    }

    /** @type {HTMLElement} */
    let pageElement
    switch (route) {
      case "/":
        pageElement = document.createElement("h1")
        pageElement.textContent = "Menu"
        break

      case "/order":
        pageElement = document.createElement("h1")
        pageElement.textContent = "Your Order"
        break

      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("h1")
          pageElement.textContent = "Details"
          const paramId = route.substring(route.lastIndexOf("-"), +1)
          pageElement.dataset.id = paramId
        }
        break
    }

    if (pageElement) {
      const cache = document.querySelector("main")
      cache.innerHTML = ""
      cache.appendChild(pageElement)

      window.scrollX = 0
      window.scrollY = 0
    }
  },
}

export default Router
