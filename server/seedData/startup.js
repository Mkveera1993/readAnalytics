'use strict';

const async = require('async');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
var config = require('../config/config');





mongoose.connect(config.mongo.uri + config.mongo.dbName, config.mongo.options, function (err, db) {
    if (err) {
        console.log(`Mongodb connection faild==>${err}`)
    } else {
        console.log(`mongodb successfully connected with ${config.mongo.dbName}`)
    }
});

//Models
var User = require('../models/user_model');
var Account = require('../models/account_model');
var School = require('../models/school_model');
var Class = require('../models/class_model');
var Question = require('../models/question_model');
var Session = require('../models/session_model');
var classroomSession = require('../models/classroom_session_model');
var classroomSessionResponse=require('../models/classroom_session_response_model');
//JSON Data
var userList = require('./jsons/users');
var schoolList = require('./jsons/schools');
var questionList = require('./jsons/questions');


//inMemory variables

var schoolArray = [];
var userLists = [];
var teacherCodes = [];
var classesAry=[];
var studentCodes = [];
var questionsAry = [];
var sessionAry = [];
var title=["Crop Production and Management.","Microorganisms : Friend and Foe.","Synthetic Fibres and Plastics.","Materials : Metals and Non-Metals.","Coal and Petroleum.","Combustion and Flame.","Some Natural Phenomena","Stars and the Solar System","Microorganisms: Friend and Foe","Materials: Metals and Non Metals"]


// Creating list of Schools
async.waterfall([
    function createSchoolList(callback) {
        School.create(schoolList, function (err, schools) {
            if (err) {
                console.log(err);
                callbac(err)
            } else {
                console.log(`${schools.length} schools created successfully`);
                schoolArray = schools;
                callback(null, schools)
            }
        })
    },
    function createUsersAndAccount(schools, callback) {
        createUsers(function (err, users) {
            if (err) {
                callback(err)
            } else {
                callback(null, users)
            }
        })
    },

    function createClasses(users, callback) {
        teacherCodes = users.filter((item) => {
            return item.role == 2
        }).map((item) => {
            return item.user_code
        }); //filtering only Teachers usercodes;
        studentCodes = users.filter((item) => {
            return item.role == 1
        }).map((item) => {
            return item.user_code
        }); //filtering only Students usercodes;
        var c=["10th","12th","11th","8th"];
        var c1=["A","B","C"]
        for (const school of schoolArray) {
            let newClass = {
                school_code: school.school_code,
                class_name: c1[Math.floor(Math.random() * c1.length)],
                class_code: c[Math.floor(Math.random() * c.length)],
                class_teacher: teacherCodes[Math.floor(Math.random() * teacherCodes.length)],
                students: studentCodes
            }
            classesAry.push(newClass);
        };
        Class.create(classesAry, function (err, classes) {
            if (err) {
                console(`Getting Error while creating classes ==>${err}`);
                callback(err)
            } else {
                console.log(`Classes created Successfully`);
                callback(null, classes);
            }
        })
    },

    function createQustions(classes, callback) {
        for (let question of questionList) {
            question.question_key = "QSN-" + uuidv4().split("-")[0].toUpperCase();
            question.asked_by = teacherCodes[0];
            question.asked_at = new Date();
            questionsAry.push(question);
        }
        Question.create(questionsAry, function (err, questions) {
            if (err) {
                console.log(`Getting error while creating questions==>${err}`);
                callback(err)
            } else {
                console.log(`Quetions created Successfully`);
                callback(null, questions);
            }
        })
    },

    function createSession(questions, callback) {
        var questionsKeys = questions.map((item) => {
            return item.question_key
        });
        for (let i = 0; i < 10; i++) {
            var session = {
                session_key: "SEN-" + uuidv4().split("-")[1].toUpperCase(),
                start_time: new Date(),
                end_time: new Date(new Date().setHours(new Date().getHours() + 2)),
                for_class: "10",
                subject: "Science",
                sub_subject: "Physics",
                studio_name: "Studio " + Math.floor(Math.random() * 5).toString(),
                studio_teacher: teacherCodes[Math.floor(Math.random() * teacherCodes.length)],
                question_asked: questionsKeys,
                session: Math.floor(Math.random() * 100),
                topic: Math.floor(Math.random() * 100),
                read_velocity: Math.floor(Math.random() * 100),
                title:title[i],
                type:"studio"
            }
            sessionAry.push(session)
        }

        Session.create(sessionAry, function (err, sessions) {
            if (err) {
                console.log(`Getting error while creating Sessions==>${err}`);
                callback(err)
            } else {
                console.log(`Sessions created Successfully`);
                callback(null, sessions);
            }
        });
    },

    function createClassroomSession(sessions, callback) {
        var questionsKeys = questionsAry.map((item) => {
            return item.question_key
        });
        var sub=["Maths","Science","English"];
        var sessionAry = [];
              for (const clas of classesAry) {
                var session = {
                    session_key: "SEN-" + uuidv4().split("-")[1].toUpperCase(),
                    school_code: clas.school_code,
                    read_velocity: 76,
                    session: 56,
                    topic: 58,
                    start_time: new Date(),
                    end_time: new Date(new Date().setHours(new Date().getHours() + 2)),
                    for_class: clas.class_code,
                    subject: sub[Math.floor(Math.random() * sub.length)],
                    sub_subject: "Sub "+sub[Math.floor(Math.random() * sub.length)],
                    class_teacher: clas.class_teacher,
                    total_responses: clas.students.length,
                    attendance: {
                        absent: clas.students.length,
                        present: clas.students.length - 1
                    },
                    students: clas.students,
                    question_asked: questionsKeys,
                    type:"class",
                    title:title[Math.floor(Math.random() * 10)]
                }
                sessionAry.push(session)
              }
           
            
        

        classroomSession.create(sessionAry, function (err, sessions) {
            if (err) {
                console.log(`Getting error while creating classroomSession==>${err}`);
                callback(err)
            } else {
                console.log(`classroomSession created Successfully`);
                callback(null, sessions);
            }
        });
    },
    function createClassroomSessionResponse(sessions, callback) {
        var responseAry=[]
        for (const session of sessions) {
            for (const student of session.students) {
            var answers=[]
             for (const qustion_key of session.question_asked) {
                    var options=["A","B","C","D"];
                    var answer={
                        [qustion_key]:{
                            answer: options[Math.floor(Math.random() * options.length)],
                            raised_hand: Math.floor(Math.random() * 50),
                            session: Math.floor(Math.random() * 100),
                            read_velocity: Math.floor(Math.random() * 100),
                            topic: Math.floor(Math.random() * 100)
                        }
                    }
                    answers.push(answer)

                }
                var response = {
                    session_key: session.session_key,
                    school_code: session.school_code,
                    class_code: session.for_class,
                    user_code: student,
                    answers: answers,
                    session: session.session,
                    topic: session.topic,
                    read_velocity: session.read_velocity
                }
                responseAry.push(response)
             }            
        }   

         
        for (const session of sessionAry) {
            for (const student of studentCodes) {
            var answers=[]
             for (const qustion_key of session.question_asked) {
                    var options=["A","B","C","D"];
                    var answer={
                        [qustion_key]:{
                            answer: options[Math.floor(Math.random() * options.length)],
                            raised_hand: Math.floor(Math.random() * 50),
                            session: Math.floor(Math.random() * 100),
                            read_velocity: Math.floor(Math.random() * 100),
                            topic: Math.floor(Math.random() * 100)
                        }
                    }
                    answers.push(answer)

                }
                var response = {
                    session_key: session.session_key,
                    school_code: session.studio_name,
                    class_code: session.for_class,
                    user_code: student,
                    answers: answers,
                    session: session.session,
                    topic: session.topic,
                    read_velocity: session.read_velocity
                }
                responseAry.push(response)
             }            
        }     
        classroomSessionResponse.create(responseAry, function (err, responses) {
            if (err) {
                console.log(`Getting error while creating classroomSession response==>${err}`);
                callback(err)
            } else {
                console.log(`classroomSession response created Successfully`);
                callback(null, responses);
            }
        });


    }

], function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log('Success');
        process.exit(1)
    }
})


// Creating Users
function createUsers(callback) {
    async.eachSeries(userList, function (user, callback) {
            user.user_code = "USR-" + uuidv4().split('-')[4].toUpperCase();
            User.create(user, function (err, user) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log(`user created successfully for ${user.username}`);
                    createAccount(user).then((account) => {
                        userLists.push(user)
                        callback(null, user);
                    }).catch((err) => {
                        console.log(err);
                        callback(err);
                    })
                }
            })
        },
        function (err, success) {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(null, userLists)
            }
        })
}



//Creating Accounts
function createAccount(user) {
    return new Promise(function (resolve, reject) {
        var account = {
            "user_code": user.user_code,
            "school_code": schoolArray[Math.floor(Math.random() * schoolArray.length)].school_code, //Selecting random school code
            "isVerified": true,
            "isInactive": false
        }
        Account.create(account, function (err, account) {
            if (err) {
                console.log(`getting error while creating Account for user ${user.username}`)
                reject(err)
            } else {
                console.log(`Account created successfully for user ${user.username}`);
                resolve(account)
            }
        })
    })
}