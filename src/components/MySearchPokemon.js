import { state } from "../state/state";

class MySearchPokemon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleSearch = this.handleSearch.bind(this);
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('button').addEventListener('click', this.handleSearch);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.handleSearch);
    }

    async handleSearch() {
        const query = this.shadowRoot.querySelector('input').value;
        if (query) {
            await this.fetchPokemon(query);
        }
    }

    async fetchPokemon(query) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Pokemon Data:", data);

                state.setState({
                    pokemonData: data
                });
                // Handle the fetched data as needed
            } else {
                console.error('Pokémon not found');
            }
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
            </style>
            <div>
                <input type="text" placeholder="Search for a Pokémon" />
                <button>Search</button>
            </div>
        `;
    }
}

customElements.define('my-search-pokemon', MySearchPokemon);