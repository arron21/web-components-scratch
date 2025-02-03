"use strict";
// Get the main content area where pages will be displayed
var mainContent = document.getElementById('main-content'); // Make sure you have this element in your HTML
// Define routes (mapping paths to components or functions)
var routes = {
    '/': function _() {
        return document.createElement('my-home-page');
    },
    // Web Component
    '/about': function _about() {
        return document.createElement('my-about-page');
    },
    // Web Component
    '/contact': function _contact() {
        // Example with a function and no web component
        var contactPage = document.createElement('div');
        contactPage.innerHTML = "<p>Contact us at info@example.com</p>";
        return contactPage;
    },
    '/products/:id': function _products_Id(params) {
        var productPage = document.createElement('div');
        productPage.textContent = "Product ID: ".concat(params.id);
        return productPage;
    },
    '*': function _() {
        // Catch-all for 404s
        var notFoundPage = document.createElement('div');
        notFoundPage.textContent = "404: Page Not Found";
        return notFoundPage;
    }
};
function handleNavigation(url) {
    var path = url.pathname;
    var params = {};
    // Extract path parameters (e.g., /products/123)
    var pathParts = path.split('/').filter(function(part) {
        return part !== '';
    });
    if (pathParts.length > 1 && pathParts[0] === 'products') params.id = pathParts[1]; // Get the ID
    var routeHandler = routes[path] || routes['*']; // Get handler or 404
    var pageContent = routeHandler(params); // Call the handler, pass the parameters
    mainContent.innerHTML = ''; // Clear existing content
    mainContent.appendChild(pageContent); // Add the new content
    // Update browser history (important for back/forward buttons)
    window.history.pushState(null, '', url); // Update the URL in the address bar
}
// Initial navigation on page load
handleNavigation(window.location);
// Intercept link clicks (prevent full page reload and handle routing)
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Prevent default link behavior
        var href = event.target.getAttribute('href');
        var url = new URL(href, window.location.origin); // Create a full URL object
        handleNavigation(url);
    }
});
// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    handleNavigation(window.location);
});

//# sourceMappingURL=index.cb3f8404.js.map
