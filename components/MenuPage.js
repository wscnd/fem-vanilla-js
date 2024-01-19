export class MenuPage extends HTMLElement {
  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.loadCSS(this.root)
  }

  /**
   * @param {ShadowRoot} node
   * @memberof MenuPage
   */
  async loadCSS(node) {
    const req = await fetch("/components/MenuPage.css")
    const css = await req.text()

    const styles = document.createElement("style");
    styles.textContent = css
    node.appendChild(styles)
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