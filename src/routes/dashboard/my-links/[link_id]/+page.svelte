<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    export let data;

    let chartLabels = []
    
    data.statistics.views.map((date) => {
        date = roundMinutes(new Date(date))
        if(!chartLabels.includes(date)) chartLabels.push(1)
    });

    let chartData = data.statistics.views.map((date) => 
        roundMinutes(new Date(date))
    );

    onMount(()  => {
        const ctx = document.getElementById('chart');
        new Chart(ctx, {
            type: 'line', 
            data: {
                labels:chartLabels, 
                datasets: [{
                    label: new URL(data.link.redirectTo).origin+new URL(data.link.redirectTo).pathname,
                    data: chartData,
                    backgroundColor: [
                        '#1eb854',
                    ],
                }]
            },
            tension: 0.1,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            }
        });
    });

    function roundMinutes(date) {
        date.setHours(date.getHours() + Math.floor(date.getMinutes()/60));
        date.setMinutes(0, 0, 0);
        return date;
    }
</script>

<svelte:head>
	<title>Link to {new URL(data.link.redirectTo).origin+new URL(data.link.redirectTo).pathname}</title>
</svelte:head>

<canvas id="chart"></canvas>