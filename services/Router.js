const Router = {
  init: function () {
    document.querySelectorAll("a.navlink").forEach(a => {
      addEventListener("click", event => {
        event.preventDefault()
        console.log("Link clicked");
      })
    })
  },

  go: function (path, addToHistory = true) {
    console.log(`Going to ${route}`);
  }
}

export default Router
