export class MenuPage extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: "open" })
    this.#loadCSS(this.root)
    console.log("I have been created")
  }

  /**
   * @param {ShadowRoot} node
   * @memberof MenuPage
   */
  async #loadCSS(node) {
    const req = await fetch("/components/MenuPage.css")
    const css = await req.text()

    const styles = document.createElement("style");
    styles.textContent = css
    node.appendChild(styles)
  }

  // NOTE: when the component is attached to the DOM
  connectedCallback() {
    console.log("I have connected menu page")
    /** @type {HTMLTemplateElement} */
    const template = document.getElementById('menu-page-template');

    // NOTE: the template is unusable, you have to clone and create a real instance of the template
    const content = template.content.cloneNode(true)
    this.root.appendChild(content)

    // listen to custom events
    window.addEventListener("app-menu-changed", (event) => {
      this.render()
    })
    this.render()
  }

  disconnectedCallback() {
    console.log("I have connected menu page ");
  } // The element is removed to the document

  adoptedCallback() {
    console.log("I have adopted menu page");

  } // The element has been moved to a new document, from another ShadowDOM

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("I have changed menu page");
  }


  async render() {
    const menu = this.root.querySelector("#menu")

    if (app.store.menu === null) {
      menu.innerHTML = "Loading..."
      return
    }

    // clearing
    menu.innerHTML = ""
    for (let category of app.store.menu) {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${category.name} </h3>
      <ul class='category'>

      </ul>
      `
      menu.appendChild(li)

      category.products.forEach(product => {
        const item = document.createElement("product-item");
        item.dataset.product = JSON.stringify(product)
        li.querySelector("ul").appendChild(item)
      })
    }
  }
}

// by defining the components we're registering the component so the browser will know
// what to do when it finds a element with this tag
customElements.define("menu-page", MenuPage)