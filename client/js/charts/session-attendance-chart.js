// JavaScript Document

// attendance-trend
var barChartData = {
    labels: [
        "Jun 18",
        "July 18",
        "Aug 18",
        "Sep 18",
        "Oct 18",
        "Nov 18",
        "Dec 18",
        "Jan 19",
        "Feb 19",
        "Mar 19",
        "April 19",
        "May 19"
    ],
    datasets: [{
            label: "Studio",
            backgroundColor: "#f4725c",
            borderColor: "#f4725c",
            borderWidth: 0,
            //maxHeight: 6,
            data: [3, 5, 6, 7, 3, 5, 6, 7, 9, 6, 5, 6]
        },
        {
            label: "Class Room",
            backgroundColor: "#99aabb",
            borderColor: "#99aabb",
            borderWidth: 0,
            //maxHeight: 6,
            data: [4, 7, 3, 6, 3, 7, 4, 6, 8, 5, 4, 6]
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
                barThickness: 21,
                barPercentage: 1,
                categoryPercentage: 0.5,
            gridLines: {
                borderDash: [3, 3],
                color: "#E6EAF2"
            },
            ticks: {
                fontSize: 12,
                fontColor: '#464646;',
                fontFamily: "'Roboto'",
                fontWeight: "500"
            }

        }],
        yAxes: [{
            ticks: {
                //beginAtZero: true
                min: 0,
                max: 10,
                stepSize: 2,
                fontSize: 12,
                fontColor: '#464646;',
                fontFamily: "'Roboto'",
                fontWeight: "500"
            },
            gridLines: {
                borderDash: [3, 3],
                color: "#E6EAF2"
            },

        }]
    }
}

window.onload = function() {
    var ctx = document.getElementById("attendance-trend").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: chartOptions
    });
};

// Date Picker

$(function() {
    $("#datepicker").datepicker({
        showOn: 'button',
        buttonImage: 'img/calender-icon.png',
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showAnim: 'slideDown',
        duration: 'fast',
        dateFormat: 'dd-mm-yy'
    });
});