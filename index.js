$(document).ready (function(){

    fetch('cgi-bin/courses.cgi')
        .then(res => res.json())
        .then(res => {
            for (let k in res) {
                var x = document.getElementById("course-select");
                var option = document.createElement("option");
                option.text = res[k];
                option.value = k;
                x.add(option);
            }
        })
        .catch(error => console.error("Er ging iets mis."));

});

function getCourses(data) {
    $('#container').text("Grafiek wordt geladen...");
    data = Number(data);

    fetch('cgi-bin/tojson.cgi?data=' + JSON.stringify(data))
        .then(res => res.json())
        .then(res => {
            let namenOef = [];
            let correcteOef = [];
            let fouteOef = [];
            //array invullen voor de grafiek.
            for (let key in res) {
                namenOef.push(res[key][0]);
                correcteOef.push(res[key][1]["correct"]);
                fouteOef.push(res[key][1]["fout"]);
            }

            //grafiek zelf:
            Highcharts.chart('container', {
                chart: {
                    type: 'bar',
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(38,38,38)'],
                            [1, 'rgb(38,38,38)']
                        ]
                    }
                },
                title: {
                    text: 'Moeilijkste oefeningen',
                    style: {
                        color: '#ffffff',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                    }

                },
                subtitle: {
                    text: 'Source: Dodona',
                    style: {
                        color: '#ffffff',
                        font: 'bold 10px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                xAxis: {
                    //categories: ["a", "b"],
                    categories: namenOef,
                    colors: "#ffffff",
                    title: {
                        text: null
                    },
                    style: {
                        color: '#ffffff',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Aantal ingediende oefeningen',
                        align: 'high',
                        color: "#ffffff"
                    },
                    labels: {
                        overflow: 'justify'
                    },
                    style: {
                        color: '#2c681d',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#c2c2c2'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                colors: ["rgb(158,193,46)", "rgb(113,23,37)"],
                series: [{
                    name: 'Correct',
                    data: correcteOef,
                    //data: [3, 5]
                    style: {
                        color: '#e5e5e5',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                    }
                }, {
                    name: 'Fout',
                    data: fouteOef,
                    //data: [10, 15],
                    style: {
                        color: '#fafafa',
                        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                    }
                }]
            })
        }
    )
    .catch(error => console.error("Er ging iets mis."));


    }

