document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('chart-form');
    const chartImg = document.getElementById('chart');
    const manualInputDiv = document.getElementById('manual-input');
    const dataSourceSelect = document.getElementById('data-source');
    const chartTypeSelect = document.getElementById('chart-type');
    const chartDataInput = document.getElementById('chart-data');
    const API_URL = 'https://quickchart.io/chart';

    const dataSources = {
        books: [15, 25, 35, 45],
        animals: [10, 20, 30, 40],
        phones: [5, 10, 15, 20],
        laptops: [8, 16, 24, 32]
    };

    function generateChartUrl(data, type) {
        return `${API_URL}?c={
            type:'${type}',
            data: {
                labels: [${data.map((_, i) => `'Item ${i+1}'`).join(',')}],
                datasets: [{
                    label: 'Data',
                    data: [${data.join(',')}],
                }]
            }
        }`;
    }

    function updateChart() {
        const dataSource = dataSourceSelect.value;
        const type = chartTypeSelect.value;
        let data;

        if (dataSource === 'manual') {
            data = chartDataInput.value.split(',').map(Number);
        } else {
            data = dataSources[dataSource];
        }

        if ((dataSource === 'manual' && data.some(isNaN)) || !type) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const chartUrl = generateChartUrl(data, type);
        chartImg.src = chartUrl;   //new Date().getTime();
        chartImg.alt = 'Chart';
    }

    dataSourceSelect.addEventListener('change', function () {
        if (this.value === 'manual') {
            manualInputDiv.style.display = 'block';
        } else {
            manualInputDiv.style.display = 'none';
            chartDataInput.value = '';
        }
        updateChart(); // Update chart when data source changes
    });

    chartTypeSelect.addEventListener('change', updateChart);
    chartDataInput.addEventListener('input', updateChart);

    // Initial chart load
    updateChart();

    // Update chart every 5 minutes
    setInterval(updateChart, 1 * 10; // 5 minutes in milliseconds
});
