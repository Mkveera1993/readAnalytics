'use strict';

var async = require('async');

var User = require('../models/user_model');
var Session = require('../models/session_model');
var Class = require('../models/class_model');
var ClassSession = require('../models/classroom_session_model');
var ClassSessionResponse = require('../models/classroom_session_response_model');

var sessionService = {
    getSessions: getSessions,
    createSession: createSession,
    getSession: getSession,
    updateSession: updateSession,
    getSessionReport: getSessionReport
}

function getSessions(query, callback) {

}

function getSession(id, callback) {

}

function createSession(body, callback) {

}

function updateSession(body, callback) {

}

function getSessionReport(query, callback) {
    var user=query.user_code;
    var result = {}
    async.waterfall([
            function getStudioSession(cb) {
                Session.aggregate([{
                        $match: {
                            studio_teacher: user
                        }
                    },
                    {
                        $sort: {
                            start_time: -1
                        }
                    },
                    {
                        $lookup: {
                            from: "questions",
                            localField: "question_asked",
                            foreignField: "question_key",
                            as: "questions"
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "studio_teacher",
                            foreignField: "user_code",
                            as: "studio_teacher"
                        }
                    },
                    {
                        $project: {
                            title:1,
                            questions: 1,
                            session_key: 1,
                            start_time: 1,
                            end_time: 1,
                            session_duration: 1,
                            for_class: 1,
                            subject: 1,
                            sub_subject: 1,
                            studio_name: 1,
                            studio_teacher: {
                                $arrayElemAt: ['$studio_teacher.profile', 0]
                            },
                            question_asked: 1,
                            type: "studio"
                        }
                    }

                ], function (err, studiosessions) {
                    if (err) {
                        cb(err)
                    } else {
                        result.studiosessions = studiosessions;
                        cb()
                    }
                })
            },
            function getClassSessions(cb) {
                ClassSession.aggregate([{
                        $match: {
                            class_teacher: user
                        }
                    },
                    {
                        $sort: {
                            start_time: -1
                        }
                    },
                    {
                        $lookup: {
                            from: "questions",
                            localField: "question_asked",
                            foreignField: "question_key",
                            as: "questions"
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "class_teacher",
                            foreignField: "user_code",
                            as: "class_teacher"
                        }
                    }, {
                        $project: {
                            title:1,
                            questions: 1,
                            session_key: 1,
                            school_code: 1,
                            start_time: 1,
                            end_time: 1,
                            session_duration: 1,
                            for_class: 1,
                            subject: 1,
                            sub_subject: 1,
                            class_teacher: {
                                $arrayElemAt: ['$class_teacher.profile', 0]
                            },
                            question_asked: 1,
                            read_velocity: 1,
                            session: 1,
                            topic: 1,
                            total_responses: 1,
                            attendance: 1,
                            students: 1,
                            type: "class"
                        }
                    }

                ], function (err, classSessions) {
                    if (err) {
                        cb(err)
                    } else {
                        result.classSessions = classSessions;
                        cb(null, result)
                    }
                })
            },

            function getClassSessionsResponse(result, cb) {
                var sessionkeys = result.studiosessions.map((item) => {
                    return item.session_key
                }).concat(result.classSessions.map((item) => {
                    return item.session_key
                }));
                ClassSessionResponse.aggregate([
                    {$match: {
                        session_key: {
                            $in: sessionkeys
                        }
                    }},
                    {$lookup:{
                        from:"users",
                        localField: "user_code",
                        foreignField: "user_code",
                        as: "student"
                    }},
                    {
                        $project: {
                            session_key: 1,
                            school_code: 1,
                            class_code: 1,
                            user_code: 1,
                            answers: 1,
                            session:1,
                            topic:1,
                            read_velocity:1,
                            student: {
                                $arrayElemAt: ['$student.profile', 0]
                            }
                        }
                    }
                ], function (err, response) {
                    if (err) {
                        cb(err)
                    } else {
                        result.response = response;
                        result.sessionkeys = sessionkeys;
                        cb(null, result)
                    }
                })
            }

        ],
        function (err, result) {
            if (err) {
                callback(err)
            } else {
                result.sessions = result.classSessions.concat(result.studiosessions);
                delete result.classSessions;
                delete result.studiosessions;
                getQuestionaskedBy(result.sessions).then((session) => {
                    result.sessions = sessions;
                    callback(null, result)
                }).catch((err) => {
                    callback(null, result)
                })

            }
        })

}


async function getQuestionaskedBy(sessions) {
    var tempsession = [];
    for (const session of sessions) {
        var questions = []
        for (const qtn of session.questions) {
            var user = await getUserByCode(qtn.asked_by)
            qtn.asked_by = {
                name: user.profile.name_first+' '+ user.profile.name_last,
                address: user.address
            };
            questions.push(qtn)
        }
        session.questions = questions
        tempsession.push(session)
    }

    return tempsession
}

async function getUserByCode(user_code) {
    return await new Promise(function (resolve, reject) {
        User.findOne({
            user_code: user_code
        }, function (err, user) {
            if (err) {
                reject()
            } else {
                resolve(user)
            }
        })

    })


}



module.exports = sessionService;