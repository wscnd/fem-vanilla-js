export class MenuPage extends HTMLElement {
  constructor() {
    super()
  }

  // NOTE: when the component is attached to the DOM
  connectedCallback() {
    /** @type {HTMLTemplateElement} */
    const template = document.getElementById('menu-page-template');

    // NOTE: the template is unusable, you have to clone and create a real instance of the template
    const content = template.content.cloneNode(true)
    this.appendChild(content)
  }
}

customElements.define("menu-page", MenuPage)