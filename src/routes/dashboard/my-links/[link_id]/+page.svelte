<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    export let data;

    if(data.statistics){
        const views = {};
        data.statistics.views.map(function (x) { x = roundMinutes(new Date(x)).getTime(); views[x] = (views[x] || 0) + 1; });
    
        const chartLabels = Object.keys(views).map(date => {
            date = new Date(parseInt(date));
            let year = date.getFullYear();
            let month = date.getMonth();
    
            return `${date.getHours()}h-${('0' + date.getDate()).slice(-2)}${month == new Date().getMonth() ? "" : "/"+month}${year == new Date().getFullYear() ? "" : "/"+year}`
        });
    
        const chartData = Object.values(views);
    
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
    }


    function roundMinutes(date) {
        date.setHours(date.getHours() + Math.floor(date.getMinutes()/60));
        date.setMinutes(0, 0, 0);
        return date;
    }
</script>

<svelte:head>
	<title>Link to {new URL(data.link.redirectTo).origin+new URL(data.link.redirectTo).pathname}</title>
</svelte:head>

<div class="grid">
    <p class="text-xl">
        <a class="link" target="_blank" href="{data.link.redirectTo}">{data.link.redirectTo}</a>
        <i class="bi bi-arrow-right-short"></i>
        <a class="link" target="_blank" href="{data.shortUrlBaseUrl+data.link.id}">{data.shortUrlBaseUrl+data.link.id}</a>
    </p>
    <canvas id="chart"></canvas>
</div>
