class e extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=document.createElement("p");t.textContent="Welcome to the Home Page (Vanilla JS)!";let n=document.createElement("style");n.textContent="p { color: blue; }",e.appendChild(n),e.appendChild(t)}}customElements.define("my-home-page",e);class t extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=document.createElement("p");t.textContent="This is the About Page (Vanilla JS)!",e.appendChild(t)}}customElements.define("my-about-page",t);class n extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=document.createElement("p");t.textContent="Contact Us!",e.appendChild(t)}}customElements.define("my-contact-page",n);class o extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=document.createElement("p");t.textContent="Fetching data...",e.appendChild(t);let n=document.createElement("my-search-pokemon");e.appendChild(n);let o=document.createElement("my-pokemon-details");e.appendChild(o);let s=document.createElement("my-pokemon-cry");e.appendChild(s),fetch("https://pokeapi.co/api/v2/pokemon/").then(e=>e.json()).then(e=>{t.textContent=`Fetched Data: ${e.count} Pokemon`}).catch(e=>{t.textContent=`Error: ${e.message}`})}}customElements.define("my-fetch-test",o);const s=new class{constructor(){this._state={userName:"",cartItems:[],searchQuery:"",pokemonData:{}},this.listeners=new Set}getState(){return this._state}setState(e){this._state={...this._state,...e},this.notifyListeners()}subscribe(e){this.listeners.add(e)}unsubscribe(e){this.listeners.delete(e)}notifyListeners(){this.listeners.forEach(e=>e(this._state))}};class a extends HTMLElement{connectedCallback(){s.subscribe(this.updateState.bind(this)),this.render()}disconnectedCallback(){s.unsubscribe(this.updateState.bind(this))}updateState(e){console.log("State updated:",e),this.render()}render(){let{userName:e}=s.getState();this.shadowRoot.innerHTML=`
        <p>Hello, ${e}!</p>
      `}}customElements.define("my-component",a),s.setState({userName:"Alice"});class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),document.createElement("p").textContent="Search for a Pokemon!"}connectedCallback(){s.subscribe(this.renderPokemon.bind(this))}disconnectedCallback(){s.unsubscribe(this.renderPokemon.bind(this))}renderPokemon(e){console.log(e);let t=e.pokemonData;t&&this.render(t)}render(e=null){e?this.shadowRoot.innerHTML=`
        <p>Name: ${e.name}, Height: ${e.height}, Weight: ${e.weight}</p>
      `:this.shadowRoot.innerHTML=`
        <p>Fetching Pok\xe9mon details...</p>
      `}}customElements.define("my-pokemon-details",c);class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){s.subscribe(this.renderPokemon.bind(this))}disconnectedCallback(){s.unsubscribe(this.renderPokemon.bind(this))}renderPokemon(e){console.log(e);let t=e.pokemonData;t&&this.render(t)}render(e=null){if(e){let t=document.createElement("audio");t.controls=!0,t.src=e.cries.latest,this.shadowRoot.appendChild(t)}else this.shadowRoot.innerHTML=`
            <p>Couldn't Load Cry...</p>
          `}}customElements.define("my-pokemon-cry",r);class d extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"}),t=document.createElement("p");t.textContent="Fetching Pokémon sprites...",e.appendChild(t),fetch(this.getAttribute("data-url")).then(e=>e.json()).then(n=>{let o=document.createElement("img");o.src=n.sprites.front_default;let s=document.createElement("img");s.src=n.sprites.back_default,e.appendChild(o),e.appendChild(s),t.textContent=`Sprites for: ${n.name}`}).catch(e=>{t.textContent=`Error: ${e.message}`})}}customElements.define("my-pokemon-sprites",d);class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.handleSearch=this.handleSearch.bind(this)}connectedCallback(){this.render(),this.shadowRoot.querySelector("button").addEventListener("click",this.handleSearch)}disconnectedCallback(){this.shadowRoot.querySelector("button").removeEventListener("click",this.handleSearch)}async handleSearch(){let e=this.shadowRoot.querySelector("input").value;e&&await this.fetchPokemon(e)}async fetchPokemon(e){try{let t=await fetch(`https://pokeapi.co/api/v2/pokemon/${e.toLowerCase()}`);if(t.ok){let e=await t.json();console.log("Pokemon Data:",e),s.setState({pokemonData:e})}else console.error("Pokémon not found")}catch(e){console.error("Error fetching Pokémon:",e)}}render(){this.shadowRoot.innerHTML=`
            <style>
                /* Add your styles here */
            </style>
            <div>
                <input type="text" placeholder="Search for a Pok\xe9mon" />
                <button>Search</button>
            </div>
        `}}customElements.define("my-search-pokemon",i);const l=document.getElementById("main-content"),h={"/":()=>document.createElement("my-home-page"),"/about":()=>document.createElement("my-about-page"),"/contact":()=>{let e=document.createElement("div");return e.innerHTML="<p>Contact us at info@example.com</p>",e},"/products/:id":e=>{let t=document.createElement("div");return t.textContent=`Product ID: ${e.id}`,t},"/fetch-test":()=>document.createElement("my-fetch-test"),"*":()=>{let e=document.createElement("div");return e.textContent="404: Page Not Found",e}};function m(e){let t=e.pathname,n={},o=t.split("/").filter(e=>""!==e);o.length>1&&"products"===o[0]&&(n.id=o[1]);let s=(h[t]||h["*"])(n);l.innerHTML="",l.appendChild(s),window.history.pushState(null,"",e)}m(window.location),document.addEventListener("click",e=>{"A"===e.target.tagName&&(e.preventDefault(),m(new URL(e.target.getAttribute("href"),window.location.origin)))}),window.addEventListener("popstate",()=>{m(window.location)});
//# sourceMappingURL=index.c6300b79.js.map
