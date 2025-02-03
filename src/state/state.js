class State {
    constructor() {
      this._state = {
        userName: '',
        cartItems: [],
        searchQuery: '',
        pokemonData: {},
      };
      this.listeners = new Set(); // To store listeners for changes
    }
  
    getState() {
      return this._state;
    }
  
    setState(newState) {
      this._state = {...this._state,...newState }; // Update state
      this.notifyListeners(); // Notify components about changes
    }
  
    // Add a listener to be notified of state changes
    subscribe(listener) {
      this.listeners.add(listener);
    }
  
    // Remove a listener
    unsubscribe(listener) {
      this.listeners.delete(listener);
    }
  
    // Notify all listeners about state changes
    notifyListeners() {
      this.listeners.forEach(listener => listener(this._state));
    }
  }
  
  // Create an instance of the State class
  export const state = new State();
  
  // Example usage in a component
  class MyComponent extends HTMLElement {
    connectedCallback() {
      state.subscribe(this.updateState.bind(this)); // Subscribe to changes
      this.render();
    }
  
    disconnectedCallback() {
      state.unsubscribe(this.updateState.bind(this)); // Unsubscribe
    }
  
    updateState(newState) {
      // Update component's state or re-render based on new state
      console.log("State updated:", newState);
      this.render(); // Or update specific parts of the component
    }
  
    render() {
      const { userName } = state.getState();
      this.shadowRoot.innerHTML = `
        <p>Hello, ${userName}!</p>
      `;
    }
  }
  
  customElements.define('my-component', MyComponent);
  
  // Example of updating the state
  state.setState({ userName: 'Arron' }); // This will trigger updateState in MyComponent