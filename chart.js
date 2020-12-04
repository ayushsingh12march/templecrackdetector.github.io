
function generateChart(results){
    
    var ctx = document.getElementById('myChart').getContext('2d');
    // console.log(results)
    results = results.map((result)=>result*100.0);
    console.log("Result" +results)
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Crack','no-Crack'],
        datasets: [{
            label: '% of Probability',
            data: [...results],
            backgroundColor: [
                'rgb(240, 87, 49)',
                'rgb(112, 221, 118)'
                
            ],
            borderColor: [
                'red',
                'green'
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 20
                },
                scaleLabel:{
                    display: true,
                    labelString: 'Probability',
                    fontSize: 25
                }
            }],
            xAxes: [{
                ticks: {
                    
                    fontSize: 20
                },
                scaleLabel:{
                    display: true,
                    labelString: 'Labels',
                    fontSize: 25
                }
            }]
        },
       
    }
});
document.querySelector('.cap-chart').style.display='block';
}
