class Timer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.time = 0;
        this.interval = null;
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#start').addEventListener('click', this.startTimer);
        this.shadowRoot.querySelector('#stop').addEventListener('click', this.stopTimer);
        this.shadowRoot.querySelector('#reset').addEventListener('click', this.resetTimer);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#start').removeEventListener('click', this.startTimer);
        this.shadowRoot.querySelector('#stop').removeEventListener('click', this.stopTimer);
        this.shadowRoot.querySelector('#reset').removeEventListener('click', this.resetTimer);
    }

    startTimer() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.time += 1;
                this.updateTime();
            }, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.interval);
        this.interval = null;
    }

    resetTimer() {
        this.time = 0;
        this.updateTime();
    }

    updateTime() {
        this.shadowRoot.querySelector('#time').textContent = this.time;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
            </style>
            <div>
                Timer: <span id="time">0</span> seconds
                <div>
                    <button id="start">Start</button>
                    <button id="stop">Stop</button>
                    <button id="reset">Reset</button>
                </div>
            </div>
        `;
    }
}

customElements.define('my-timer', Timer);
