/**
 * Chart web component using Apache ECharts, loaded dynamically.
 * @element az-chart
 * @property {string} data - Chart data in JSON format as a string (must be a *stringified* JSON object).
 * @property {string} [height=400px] - Chart height in CSS format (e.g., '400px', '50vh').
 * @property {string} [width=100%] - Chart width in CSS format.
 * @property {string} [echartsUrl=https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js] - URL to load ECharts from.  Change this if you want to use a different CDN or a local copy.
 */
class Chart extends HTMLElement {
    static get observedAttributes() {
      return ['data', 'height', 'width', 'echarts-url'];
    }
  
    constructor() {
      super();
      this._chart = null;
      this.data = null;
      this._height = '400px';  // Default height
      this._width = '100%';    // Default width
      this._echartsUrl = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js'; // Default ECharts URL
      this._echartsLoaded = false; // Flag to track if ECharts is loaded
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.loadECharts(); // Load ECharts when the component is connected
  
      // Handle resizing.  Essential for responsive layouts.
      window.addEventListener('resize', this.handleResize);
    }
  
  
      disconnectedCallback() {
          window.removeEventListener('resize', this.handleResize);
          if (this._chart) {
              this._chart.dispose();
              this._chart = null;
          }
      }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
  
      switch (name) {
        case 'data':
          this.data = newValue;
          this.updateChart();
          break;
        case 'height':
          this._height = newValue;
          this.updateStyle();
          break;
        case 'width':
          this._width = newValue;
          this.updateStyle();
          break;
        case 'echarts-url':
            this._echartsUrl = newValue;
            this._echartsLoaded = false; // Reset flag so it reloads
            this.loadECharts();
            break;
      }
    }
  
    handleResize = () => {
      if (this._chart) {
        this._chart.resize();
      }
    };
  
    updateStyle() {
      const container = this.shadowRoot.getElementById('chart-container');
      if (container) {
        container.style.height = this._height;
        container.style.width = this._width;
         if (this._chart) {
          this._chart.resize(); // Important: resize after style changes
        }
      }
    }
  
      updateChart() {
          if (!this._echartsLoaded || !this._chart || !this.data) return;
  
          try {
              const data = JSON.parse(this.data);
              const labelOption = {
                  show: true, position: 'inside', distance: 20,
                  align: 'left', verticalAlign: 'middle', rotate: 90,
                  formatter: '{c}  {name|{a}}', fontSize: 16,
                  rich: { name: { fontSize: 14 } }
              };
  
              data.series.forEach(item => { item.label = labelOption; });
              const option = { ...data, grid: { left: '5%', right: '5%', bottom: '10%', containLabel: true } };
              this._chart.setOption(option, true);
          } catch (error) {
              console.error("Error parsing chart data or updating chart:", error);
          }
      }
  
    loadECharts() {
      if (this._echartsLoaded) return; // Don't load if already loaded
  
      // Check if echarts is already available globally (another component might have loaded it)
      if (typeof echarts !== 'undefined') {
        this._echartsLoaded = true;
        this.initChart();
        return;
      }
  
      const script = document.createElement('script');
      script.src = this._echartsUrl;
      script.async = true;
      script.onload = () => {
        this._echartsLoaded = true;
        this.initChart();
      };
      script.onerror = () => {
        console.error(`Failed to load ECharts from ${this._echartsUrl}`);
      };
      this.shadowRoot.appendChild(script); // Append to shadow DOM
    }
  
    initChart() {
      if (this.data && this._echartsLoaded) {
        const chartDom = this.shadowRoot.getElementById('chart-container');
        if (!chartDom) return;
          if (!echarts)
          {
              console.error("Echarts is not loaded yet. Cannot initialize chart");
              return;
          }
        this._chart = echarts.init(chartDom);
        this.updateChart();
        this.updateStyle();
      }
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }
          #chart-container {
            width: ${this._width};
            height: ${this._height};
          }
        </style>
        <div id="chart-container"></div>
      `;
    }
  }
  
  customElements.define('my-chart', Chart);