class MyHomePage extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.textContent = 'Welcome to the Home Page (Vanilla JS)!';

    const style = document.createElement('style');
    style.textContent = `p { color: blue; }`;

    shadow.appendChild(style);
    shadow.appendChild(p);
  }
}

customElements.define('my-home-page', MyHomePage);
