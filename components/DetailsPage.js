import { getProductById } from '../services/Menu.js';
import { addToCart } from '../services/Order.js';

export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.#loadCSS(this.root);
  }

  /**
   * @param {ShadowRoot} node
   * @memberof MenuPage
   */
  async #loadCSS(node) {
    const req = await fetch("/components/DetailsPage.css")
    const css = await req.text()

    const styles = document.createElement("style");
    styles.textContent = css
    node.appendChild(styles)
  }

  async render() {
    if (!this.dataset.productId) {
      alert("Invalid Product ID");
      return
    }
    this.product = await getProductById(this.dataset.productId);
    this.root.querySelector("h2").textContent = this.product.name;
    this.root.querySelector("img").src = `/data/images/${this.product.image}`;
    this.root.querySelector(".description").textContent = this.product.description;
    this.root.querySelector(".price").textContent = `$ ${this.product.price.toFixed(2)} ea`
    this.root.querySelector("button").addEventListener("click", () => {
      addToCart(this.product.id);
      app.router.go('/order');
    })
  }

  connectedCallback() {
    this.render();
  }

}

customElements.define("details-page", DetailsPage);