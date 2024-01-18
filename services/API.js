const API = {
  url: "/data/menu.json",
  fetchMenu: async function () {
    const store = await fetch(API.url)
    return await store.json()
  }
}

export default API