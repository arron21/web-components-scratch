class MyAboutPage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.textContent = 'This is the About Page (Vanilla JS)!';
    shadow.appendChild(p);
  }
}

customElements.define('my-about-page', MyAboutPage);
