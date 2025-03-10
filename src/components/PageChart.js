class PageChart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const chartData = {
            title: {
                text: "Monthly Sales and Leads Data",
                subtext: "Demo Data",
                left: "center",
                top: 5
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            legend: {
                bottom: 0,
                padding: 20,
                data: ["Forest", "Steppe", "Desert", "Wetland"]
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: { show: false },
                    data: ["2012", "2013", "2014", "2015", "2016"]
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "Forest",
                    type: "bar",
                    barGap: 0,
                    emphasis: {
                        focus: "series"
                    },
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: "Steppe",
                    type: "bar",
                    emphasis: {
                        focus: "series"
                    },
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: "Desert",
                    type: "bar",
                    emphasis: {
                        focus: "series"
                    },
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: "Wetland",
                    type: "bar",
                    emphasis: {
                        focus: "series"
                    },
                    data: [98, 77, 101, 99, 40]
                }
            ]
        };

        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
            </style>
            <div>
            
                <my-chart data='${JSON.stringify(chartData)}'></my-chart>
            </div>
        `;
    }
}

customElements.define('page-chart', PageChart);
