class Clock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.updateTime = this.updateTime.bind(this);
    }

    connectedCallback() {
        this.render();
        this.updateTime();
        this.interval = setInterval(this.updateTime, 1000);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        this.shadowRoot.querySelector('#time').textContent = timeString;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
            </style>
            <div>
                Current Time: <span id="time"></span>
            </div>
        `;
    }
}

customElements.define('my-clock', Clock);
