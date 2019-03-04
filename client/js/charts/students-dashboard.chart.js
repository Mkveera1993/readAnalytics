// JavaScript Document

// difficultyLevelChart here...

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var dataPack1 = [22, 44, 25, 35, 27, 36, 25, 25, 21, 35];
var dataPack2 = [10, 12, 7, 5, 4, 6, 8, 9, 15, 16];
var dataPack3 = [17, 11, 22, 18, 12, 7, 5, 6, 15, 11];
var dates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var bar_ctx = document.getElementById('difficultyLevelChart');
var bar_chart = new Chart(bar_ctx, {
    type: 'bar',
    data: {
        labels: dates,
        //data: [60, 80, 81, 56, 55, 40],
        datasets: [{
                label: 'Correct',
                data: dataPack1,
                backgroundColor: "#0fc155",
                hoverBackgroundColor: "#0fc155",
                hoverBorderWidth: 0,


            },
            {
                label: 'Not Correct',
                data: dataPack2,
                backgroundColor: "#4c7df0",
                hoverBackgroundColor: "#4c7df0",
                hoverBorderWidth: 0
            },
            {
                label: 'InCorrect',
                data: dataPack3,
                backgroundColor: "#e50e33",
                hoverBackgroundColor: "#e50e33",
                hoverBorderWidth: 0
            },
            {
                label: 'Not Answered',
                data: dataPack3,
                backgroundColor: "#d8d8d8",
                hoverBackgroundColor: "#d8d8d8",
                hoverBorderWidth: 0
            },
        ],

        data: [10, 7, 21, 2, 3, 2, 13, 12, 11]
    },
    options: {
       /* animation: {
            duration: 10,
        },*/
        events: false,
            legend: {
                display: true
            },
            tooltips: {
                enabled: false
            },
         animation: {
                onComplete: function() {
                    var ctx = this.chart.ctx;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var chart = this;
                    var datasets = this.config.data.datasets;

                    datasets.forEach(function(dataset, i) {
                        ctx.font = "11px Roboto";
                        ctx.fillStyle = "#666";
                        chart.getDatasetMeta(i).data.forEach(function(p, j) {
                            ctx.fillText(datasets[i].data[j] + "", p._model.x, p._model.y - 20); /*%*/
                        });
                    });
                }
            },
        tooltips: {
            mode: 'label',
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                }
            }
        },
        responsive: true,
        curvature: 5,
        scales: {
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false
                },
                barPercentage: 5,
                barThickness: 12
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize : 20,
                    callback: function(tick) {
                    return tick.toString() + '%';
                    },
					 fontSize: 12,
					 fontColor: '#464646;',
					 fontFamily: "'Roboto'",
					 fontWeight: "500"
                },
                gridLines: {
                    borderDash: [5, 6],
                    color: "#E6EAF2"
                }

            }],
        }, 
        legend: {
            display: true,
            position: 'left',
        }
          
    }
});

// trendChart here...

var canvas = document.getElementById('trendChart');
var data = {
    labels: ["13 Apr", "14 Apr", "15 Apr", "16 Apr", "17 Apr", "18 Apr", "19 Apr"],
    datasets: [{
        label: "Velocity",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#4C7DF0",
        borderColor: "#4C7DF0",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#00237B",
        pointBackgroundColor: "#4C7DF0",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4C7DF0",
        pointHoverBorderWidth: 1,
        pointRadius: 5,
        pointHitRadius: 5,
        data: [2, 1, 2, 0, 3, 1, 2],
    }]
};

function adddata() {
    myLineChart.data.datasets[0].data[7] = 0;
    myLineChart.data.labels[7] = "Newly Added";
    myLineChart.update();
}

var option = {
    showLines: false
};
var myLineChart = Chart.Line(canvas, {
    data: data,
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 5,
                    stepSize: 1
                },
                gridLines: {
                    borderDash: [5, 6],
                    color: "#E6EAF2"
                },
            }]
        }
    }

});

// hand-raise

var barChartData = {
  labels: [
    "Not Answered",
    "Wrong Answered",
    "Right Answer",
    "Near to right Ans"
  ],
  datasets: [
    {
      label: "Group",
      backgroundColor: "#7cb5ec",
      borderColor: "#7cb5ec",
      borderWidth: 0,
      data: [900, 500, 900, 300]
    },
    {
      label: "My Class",
      backgroundColor: "#434348",
      borderColor: "#434348",
      borderWidth: 0,
      data: [950, 900, 400, 750]
    }
  ]
};

var chartOptions = {
  responsive: true,
  legend: {
    position: "top"
  },
  title: {
    display: false,
    text: "All Class"
  },
  scales: {
    xAxes: [{ 
          gridLines: {
              borderDash: [0, 0],
              color: "#E6EAF2"
                },
                barThickness: 22,
                barPercentage: 1,
                categoryPercentage: 0.3,
         ticks: {
         fontSize: 10,
         fontColor: '#464646;',
         fontFamily: "'Roboto'",
         fontWeight: "500"
         },
        //barPercentage: 55,
                barThickness: 10
        
            }],
    yAxes: [{
      ticks: {
        //beginAtZero: true
          min: 0,
              max: 1250,
             stepSize: 250,
       fontSize: 12,
         fontColor: '#464646;',
       fontFamily: "'Roboto'",
       fontWeight: "500"
      },
    gridLines: {
           borderDash: [0, 0],
           color: "#E6EAF2"
        },
    
    }]
  }
}

window.onload = function() {
  var ctx = document.getElementById("hand-raise").getContext("2d");
  window.myBar = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: chartOptions
  });
};

// grid time slider 

$(function() {

    $("#rang").ionRangeSlider({
        min: 0,
        max: 120,
        from: 45,
        to: 55,
        type: 'double',
        prefix: "Sec. ",
        grid: true,
        grid_num: 4,

    });

    $("#rang1").ionRangeSlider();

});

// englishChart here...

const ctxenglish = document.getElementById('englishChart').getContext('2d');
const charteng = new Chart(ctxenglish, {
    type: 'line',
    data: {
        labels: ['English', 'English', 'English', 'English'],
        datasets: [{
            data: [45, 32, 53, 80]
        }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                borderColor: '#4C7DF0',
                borderWidth: 1,
                backgroundColor: '#CFDDFF',

            },
            point: {
                radius: 2
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

// mathsChart here...

const ctxmaths = document.getElementById('mathsChart').getContext('2d');
const chartmat = new Chart(ctxmaths, {
    type: 'line',
    data: {
        labels: ['Maths', 'Maths', 'Maths', 'Maths'],
        datasets: [{
            data: [45, 65, 33, 32]
        }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                borderColor: '#4C7DF0',
                borderWidth: 1,
                backgroundColor: '#CFDDFF',

            },
            point: {
                radius: 2
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

// socialscienceChart here...

const ctxsocial = document.getElementById('socialscienceChart').getContext('2d');
const chartss = new Chart(ctxsocial, {
    type: 'line',
    data: {
        labels: ['Social Science', 'Social Science', 'Social Science', 'Social Science'],
        datasets: [{
            data: [80, 22, 23, 45]
        }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                borderColor: '#4C7DF0',
                borderWidth: 1,
                backgroundColor: '#CFDDFF',

            },
            point: {
                radius: 2
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

// hindiChart here...

const ctxhindi = document.getElementById('hindiChart').getContext('2d');
const charthin = new Chart(ctxhindi, {
    type: 'line',
    data: {
        labels: ['Hindi', 'Hindi', 'Hindi', 'Hindi'],
        datasets: [{
            data: [53, 42, 44, 60]
        }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                borderColor: '#E50E33',
                borderWidth: 1,
                backgroundColor: '#FFCFCF',

            },
            point: {
                radius: 2
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});


// scienceChart here...

const ctxscience = document.getElementById('scienceChart').getContext('2d');
const chartsci = new Chart(ctxscience, {
    type: 'line',
    data: {
        labels: ['Science', 'Science', 'Science', 'Science'],
        datasets: [{
            data: [52, 82, 33, 30]
        }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                borderColor: '#4C7DF0',
                borderWidth: 1,
                backgroundColor: '#CFDDFF',

            },
            point: {
                radius: 2
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

// historyChart here...

const ctxhis = document.getElementById('historyChart').getContext('2d');
const charthis = new Chart(ctxhis, {
    type: 'line',
    data: {
        labels: ['History', 'History', 'History', 'History'],
        datasets: [{
            data: [45, 65, 33, 32]
        }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                borderColor: '#4C7DF0',
                borderWidth: 1,
                backgroundColor: '#CFDDFF',

            },
            point: {
                radius: 2
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

// Horizontal Bar

var green = 30;
var red = 20;
var blue = 30;
var gery = 20;
var max = 80000;

var bar_ctx = document.getElementById('bar-chart');
var bar_chart = new Chart(bar_ctx, {
    type: 'horizontalBar',
    data: {
        labels: [],
        datasets: [{
                data: [green],
                backgroundColor: "#0fc155"
            },
            {
                data: [blue],
                backgroundColor: "#4c7df0"
            },
            {
                data: [red],
                backgroundColor: "#e50e33",
            },
            {
                data: [gery],
                backgroundColor: "#c3c3c3",
            },
        ]
    },
    options: {
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        scales: {
            xAxes: [{
                display: false,
                stacked: true
            }],
            yAxes: [{
                display: false,
                stacked: true
            }],
        } 
    } 
});