'use strict';

var app = angular.module('readAnalytics')

app.controller('mainController', ['$scope','$rootScope', '$filter',"$window", 'Session',"User", function ($scope,$rootScope, $filter,$window, Session,User) {

    $scope.title = "Read Analytics";
    $scope.user={};

    
    $scope.currentDate=new Date();  

    $rootScope.isLogged=function(){
        if(User.isLogged()){
            return true;
        }else{
            return false;
        }
    }

    $scope.logout=function(){
        if(User.logout()){
            $scope.isLogged=false;
            $scope.user={};
        }
    }
    

    $scope.login=function(username,password){
        var user={
            username:username,
            password:password
        }
        User.login(user).then((done)=>{
            $('#myModal').modal('hide');
            $window.location.reload()
        }).catch((err)=>{
            $('#myModal').modal('hide');
            alert(err.message)
        })
    }


    $scope.nextDay=function(){
        var d=new Date($scope.currentDate).setDate(new Date($scope.currentDate).getDate()+1);
        $scope.currentDate=new Date(d)
    }
    $scope.prevDay=function(){
        var d=new Date($scope.currentDate).setDate(new Date($scope.currentDate).getDate()-1);
        $scope.currentDate=new Date(d)
    }
   
    $scope.getSessionReport = function (user_code) {
        var query = {user_code:user_code}
        Session.getSessionReport(query).then((data) => {
            $scope.sessions = data.data.sessions;
            $scope.sessionResponse = data.data.response;
            $scope.sessionKeys = data.data.sessionkeys.sort(function (a, b) {
                return a < b
            });
            $scope.currentSession = $scope.sessionKeys[0];
            $scope.currentSessionDetails = $filter('filter')($scope.sessions, {
                "session_key": $scope.currentSession
            })[0];
            $scope.currentSessionResponseDetails = $filter('filter')($scope.sessionResponse, {
                "session_key": $scope.currentSession
            });
            $scope.currentSessionDetailsQuestions = $scope.currentSessionDetails.questions;
            $scope.questionsAnswers = {};
            for (var qst of $scope.currentSessionDetailsQuestions) {
                $scope.questionsAnswers[qst.question_key] = {
                    "correct_ans": qst.correct_ans,
                    "near_correct": qst.near_correct
                }
            }
            $scope.currentSessionDetailsQuestions = $scope.currentSessionDetailsQuestions.sort(function (a, b) {
                return a.question_key < b.question_key
            });
            $scope.currentQuestion = $scope.currentSessionDetailsQuestions[0];
            $scope.calculateAnswerData();
            $scope.calculateRaiseHandData();            
        }).catch((err) => {
            console.log(err)
        })
    }

    $scope.changeSession = function (key) {
        $scope.currentSession = key;
    }

    $scope.nextSession = function (current) {
        var index = $scope.sessionKeys.indexOf(current);
        if (index == $scope.sessionKeys.length - 1) {
            $scope.currentSession = $scope.sessionKeys[0]
        } else {
            $scope.currentSession = $scope.sessionKeys[index + 1]
        }
    }

    $scope.prevSession = function (current) {
        var index = $scope.sessionKeys.indexOf(current);
        if (index == 0) {
            $scope.currentSession = $scope.sessionKeys[$scope.sessionKeys.length - 1]
        } else {
            $scope.currentSession = $scope.sessionKeys[index - 1]
        }
    }

    $scope.$watch('currentSession', function () {
        if ($scope.currentSession) {
            $scope.currentSessionDetails = $filter('filter')($scope.sessions, {
                "session_key": $scope.currentSession
            })[0];
            $scope.currentSessionResponseDetails = $filter('filter')($scope.sessionResponse, {
                "session_key": $scope.currentSession
            });
            $scope.currentSessionDetailsQuestions = $scope.currentSessionDetails.questions;
            $scope.questionsAnswers = {};
            for (var qst of $scope.currentSessionDetailsQuestions) {
                $scope.questionsAnswers[qst.question_key] = {
                    "correct_ans": qst.correct_ans,
                    "near_correct": qst.near_correct
                }
            }
            $scope.currentSessionDetailsQuestions = $scope.currentSessionDetailsQuestions.sort(function (a, b) {
                return a.question_key < b.question_key
            });
            $scope.currentQuestion = $scope.currentSessionDetailsQuestions[0];
            $scope.calculateAnswerData();
            $scope.calculateRaiseHandData();  

        }

    });
    $scope.$watch('isLogged', function () {
        if ($scope.isLogged) {
            $scope.isLogged=$scope.isLogged;
        }
    });

    $scope.changeQuestion = function (index) {
        $scope.currentQuestion = $scope.currentSessionDetailsQuestions[index - 1];
        $scope.questionIndex = index;
    }
    
    

    $scope.calculateAnswerData = function () {
        var totalQsn=0;
        var fs=0;
        var t=0;
        var d = {
            correct: 0,
            near_correct: 0,
            incorrect: 0,
            not_answered: 0
        }
        for (let response of $scope.currentSessionResponseDetails) {
            totalQsn=totalQsn+response.answers.length;
            for (let answer of response.answers) {               
                var question = Object.keys(answer)[0];
                fs=fs+answer[question].topic;
                t=t+answer[question].session;
                answer = answer[question].answer;
                var qa = $scope.questionsAnswers[question];
                if (!answer) {
                    d.not_answered++;
                } else if (qa.correct_ans == answer) {
                    d.correct++;
                } else if (qa.near_correct == answer) {
                    d.near_correct++;
                } else {
                    d.incorrect++;
                }
            }
        }
        var data=[[],[]];

        for (var key in d) {          
                var e = d[key];
                var prctg1=parseInt((100*e)/totalQsn);
                var prctg2=parseInt((100*e)/totalQsn*2);
                data[0].push(prctg1);
                data[1].push(prctg2)

        }
      
        $scope.totalTopic=parseInt(t/totalQsn);
        $scope.totalSession=parseInt(fs/totalQsn);

        loadAnswerChart(data);
    }

    $scope.calculateRaiseHandData=function(){
        var totalQsn=0
        var d = {
            correct: 0,
            near_correct: 0,
            incorrect: 0,
            not_answered: 0
        }
        for (let response of $scope.currentSessionResponseDetails) {
            totalQsn=totalQsn+response.answers.length;
            for (let answer of response.answers) {
                var question = Object.keys(answer)[0];
                answer = answer[question];
                var qa = $scope.questionsAnswers[question];
                if (!answer.answer) {
                    d.not_answered=d.not_answered+answer.raised_hand;
                } else if (qa.correct_ans == answer.answer) {
                    d.correct=d.correct+answer.raised_hand;
                } else if (qa.near_correct == answer.answer) {
                    d.near_correct=d.near_correct+answer.raised_hand;
                } else {
                    d.incorrect=d.incorrect+answer.raised_hand;
                }
            }
        }
        var data=[[],[]];
        
        
        for (var key in d) {    
           var f= Math.floor(Math.random() * 1000)      
                var e = d[key];
                var prctg1=parseInt(e);
                var prctg2=parseInt(e+(e/2));
                data[0].push(prctg1);
                data[1].push(prctg2)

        }

        loadRaiseHandChart(data)

    }

    $scope.getClass = function (answer) {
        var question = Object.keys(answer)[0];
        answer = answer[question].answer;
        var qa = $scope.questionsAnswers[question];
        if (!answer) {
            return 'gery-box0';
        } else if (qa.correct_ans == answer) {
            return 'green-box';
        } else if (qa.near_correct == answer) {
            return 'blue-box';
        } else {
            return 'red-box';
        }
    }

    function init(){
        User.getUser().then((user)=>{
            $scope.user=user;
            $scope.getSessionReport($scope.user.user_code);
            $scope.isLogged=true;

        }).catch((err)=>{
            console.log(err)
        })
    }

    init()
    
    


}])

function loadAnswerChart(data){
    var BARCHARTEXMPLE = $('#answer_details');
    var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false
                },
                barThickness: 22,
                barPercentage: 1,
                categoryPercentage: 0.3

            }],
            yAxes: [{
                display: true,
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 20,
                },
                gridLines: {
                    borderDash: [0, 0],
                    color: "#E6EAF2"
                }
            }]
        },
         events: false,
            responsive: true,
            legend: {
                display: false
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
                        ctx.font = "12px Roboto";
                        ctx.fillStyle = "#666";
                        chart.getDatasetMeta(i).data.forEach(function(p, j) {
                            ctx.fillText(datasets[i].data[j] + "%", p._model.x, p._model.y - 20);
                        });
                    });
                }
            },
    },
    data: {
        labels: ["Correct", "Near Correct", "Incorrect", "Not Answered"],
        datasets: [{
                label: "My Class",
                data: [10.9, 4.0, 24.6, 21.1, 26.1, 14.7, 11.9, 7.3],
                backgroundColor: [
                    "#0fc155", "#4c7df0", "#E50E33", "#9B9B9B"
                ],

                borderWidth: 1,
                data: data[0],
            },
            {
                label: "Group",
                backgroundColor: [
                    "#B7ECCC", "#C9D8FA", "#F7B6C1", "#E1E0E1"
                ],

                borderWidth: 1,
                data: data[1],
            },
        ]
    }
});
}


function loadRaiseHandChart(data){
    // hand-raise

var barChartData = {
    labels: [
        "Not Answered",
        "Wrong Answered",
        "Right Answer",
        "Near to right Answer"
    ],
    datasets: [{
            label: "Group",
            backgroundColor: "#7cb5ec",
            borderColor: "#7cb5ec",
            borderWidth: 0,
            data: data[0]
        },
        {
            label: "My Class",
            backgroundColor: "#434348",
            borderColor: "#434348",
            borderWidth: 0,
            data: data[1]
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
               display: false,
                color: "#E6EAF2"
            },
            ticks: {
                fontSize: 12,
                fontColor: '#464646;',
                fontFamily: "'Roboto'",
                fontWeight: "500"
            },
             barThickness: 21,
             barPercentage: 1,
             categoryPercentage: 0.4

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

    var ctx = document.getElementById("hand-raise").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: chartOptions
    });

}