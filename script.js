document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('chart-form');
    const chartImg = document.getElementById('chart');
    const manualInputDiv = document.getElementById('manual-input');
    const dataSourceSelect = document.getElementById('data-source');
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
        const type = document.getElementById('chart-type').value;
        let data;

        if (dataSource === 'manual') {
            data = document.getElementById('chart-data').value.split(',').map(Number);
        } else {
            data = dataSources[dataSource];
        }

        if ((dataSource === 'manual' && data.some(isNaN)) || !type) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const chartUrl = generateChartUrl(data, type);
        chartImg.src = chartUrl;
        chartImg.alt = 'Chart';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        updateChart();
    });

    dataSourceSelect.addEventListener('change', function () {
        if (this.value === 'manual') {
            manualInputDiv.style.display = 'block';
        } else {
            manualInputDiv.style.display = 'none';
            document.getElementById('chart-data').value = '';
        }
        updateChart(); // Update chart when data source changes
    });

    // Initial chart load
    updateChart();

    // Update chart every 5 minutes
    setInterval(updateChart, 5 * 60 * 1000); // 5 minutes in milliseconds
});
