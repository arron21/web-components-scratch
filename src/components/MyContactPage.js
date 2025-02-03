class MyContactPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.textContent = "Contact Us!";
    shadow.appendChild(p);
  }
}

customElements.define('my-contact-page', MyContactPage);
