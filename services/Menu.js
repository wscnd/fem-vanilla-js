import API from "./API.js"

export async function loadData() {
  app.store.menu = await API.fetchMenu()
}

export async function getProductById(pId) {
  if (app.store.menu === null) {
    await loadData()
  }

  console.log("Looking for product with id", pId)
  for (const c of app.store.menu) {
    const found = c.products.find(({ id }) => {
      return id == pId
    })

    if (found) {
      return found
    }
  }

  return null
}
