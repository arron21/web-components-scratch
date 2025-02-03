class MyFetchTest extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.textContent = 'Fetching data...';
    shadow.appendChild(p);

    const searchComponent = document.createElement('my-search-pokemon');
    shadow.appendChild(searchComponent);

    const pokemonDetails = document.createElement('my-pokemon-details');
    shadow.appendChild(pokemonDetails)

    const pokemonCry = document.createElement('my-pokemon-cry');
    shadow.appendChild(pokemonCry)

    const pokemonSprites = document.createElement('my-pokemon-sprites');
    shadow.appendChild(pokemonSprites)


    
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => {
        p.textContent = `Fetched Data: ${data.count} Pokemon`;
      })
      .catch(error => {
        p.textContent = `Error: ${error.message}`;
      });
  }
}

customElements.define('my-fetch-test', MyFetchTest);
