const Router = {
  init: function () {
    document.querySelectorAll("a.navlink").forEach(a => {

      a.addEventListener("click", event => {
        event.preventDefault()
        this.go(event.target.getAttribute("href"))
      })

      // deep linking
    })
    Router.go(location.pathname)
  },

  go: (path, addToHistory = true) => {
    console.log(`Going to ${path}`)

    if (addToHistory) {
      history.pushState({ path }, null, path)
    }

    let pageElement = null
    switch (path) {
      case "/":
        pageElement = document.createElement("h1")
        pageElement.textContent = "Menu"
        break

      case "/order":
        pageElement = document.createElement("h1")
        pageElement.textContent = "Your Order"
        break
      default:
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
