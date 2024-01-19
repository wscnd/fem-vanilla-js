export class MenuPage extends HTMLElement {
  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
  }

  // NOTE: when the component is attached to the DOM
  connectedCallback() {
    /** @type {HTMLTemplateElement} */
    const template = document.getElementById('menu-page-template');

    // NOTE: the template is unusable, you have to clone and create a real instance of the template
    const content = template.content.cloneNode(true)
    this.root.appendChild(content)
  }
}

customElements.define("menu-page", MenuPage)