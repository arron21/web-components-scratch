import { state } from '../state/state.js';

class MyPokemonDetails extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.textContent = 'Search for a Pokemon!';
  }

  connectedCallback() {
    state.subscribe(this.renderPokemon.bind(this)); // Subscribe to state changes
  }

  disconnectedCallback() {
    state.unsubscribe(this.renderPokemon.bind(this)); // Unsubscribe to avoid memory leaks
  }

  renderPokemon(newState) {
    console.log(newState)
    const pokemonData = newState.pokemonData; // Access pokemon data from state
    if (pokemonData) {
      this.render(pokemonData); // Re-render with the fetched data
    }
  }


  render(pokemonData = null) { // Add pokemonData parameter
    if (pokemonData) {
      this.shadowRoot.innerHTML = `
        <p>Name: ${pokemonData.name}, Height: ${pokemonData.height}, Weight: ${pokemonData.weight}</p>
      `;
    } else {
      this.shadowRoot.innerHTML = `
        <p>Fetching Pokémon details...</p>
      `;
    }
  }
}

customElements.define('my-pokemon-details', MyPokemonDetails);
