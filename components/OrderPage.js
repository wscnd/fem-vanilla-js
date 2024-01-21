export class OrderPage extends HTMLElement {

  #user = {
    name: "",
    phone: "",
    email: ""
  }

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    const section = document.createElement("section");
    this.root.appendChild(section);

    async function loadCSS() {
      const request = await fetch("/components/OrderPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    window.addEventListener("app-cart-changed", () => {
      this.render();
    })
    this.render();
  }

  render() {
    let section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      let total = 0;
      for (let prodInCart of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        this.root.querySelector("ul").appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>
        `;
    }

    // needs to find the shadow dom element
    const form = this.root.querySelector("form");

    if (form) {
      this.setFormBindings(form)
    }
  }

  // two way data binding
  setFormBindings(form) {
    form.addEventListener("submit", event => {
      event.preventDefault()
      console.log(`event, ${this.#user.name}`)

      this.#user.name = ""
      this.#user.email = ""
      this.#user.phone = ""
    })

    this.#user = new Proxy(this.#user, {
      set(target, prop, newValue) {
        target[prop] = newValue
        form.elements[prop].value = newValue
        return true
      }
    })

    Array.from(form.elements).forEach(elm => {
      elm.addEventListener("change", evt => {
        this.#user[elm.name] = elm.value
      })
    })
  }
}
customElements.define("order-page", OrderPage);