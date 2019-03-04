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
        datasets: [{
                label: 'Correct',
                data: dataPack1,
                backgroundColor: "#0fc155",
                hoverBackgroundColor: "#0fc155",
                hoverBorderWidth: 0
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
        ]
    },
    options: {
        animation: {
            duration: 10,
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
                    callback: function(tick) {
                    return tick.toString() + '%';
                    },
                },
                gridLines: {
                    borderDash: [5, 6],
                    color: "#E6EAF2"
                }

            }],
        }, 
        legend: {
            display: null,
            position: 'left',
        }
    }
});

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