import './components.js';

const mainContent = document.getElementById('main-content');

const routes = {
  '/': () => { return document.createElement('my-home-page'); },
  '/about': () => { return document.createElement('my-about-page'); },
  '/chart': () => { return document.createElement('page-chart'); },
  '/contact': () => {
      const contactPage = document.createElement('div');
      contactPage.innerHTML = "<p>Contact us at info@example.com</p>";
      return contactPage;
  },
  '/products/:id': (params) => {
      const productPage = document.createElement('div');
      productPage.textContent = `Product ID: ${params.id}`;
      return productPage;
  },
  '/fetch-test': () => { return document.createElement('my-fetch-test'); },
  '*': () => {
      const notFoundPage = document.createElement('div');
      notFoundPage.textContent = "404: Page Not Found";
      return notFoundPage;
  }
};

function handleNavigation(url) {
  const path = url.pathname;
  const params = {};

  const pathParts = path.split('/').filter(part => part !== '');
  if (pathParts.length > 1 && pathParts[0] === 'products') {
      params.id = pathParts[1];
  }

  const routeHandler = routes[path] || routes['*'];
  const pageContent = routeHandler(params);
  mainContent.innerHTML = '';
  mainContent.appendChild(pageContent);

  window.history.pushState(null, '', url);
}

handleNavigation(window.location);

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    const url = new URL(href, window.location.origin);
    handleNavigation(url);
  }
});

window.addEventListener('popstate', () => {
  handleNavigation(window.location);
});