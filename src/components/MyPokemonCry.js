import { state } from '../state/state.js';

class MyPokemonCry extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
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
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = pokemonData.cries.latest;
            this.shadowRoot.appendChild(audio);
        } else {
          this.shadowRoot.innerHTML = `
            <p>Couldn't Load Cry...</p>
          `;
        }
      }
}

customElements.define('my-pokemon-cry', MyPokemonCry);
