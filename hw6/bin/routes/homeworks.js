(function(){
  var express, Course, Content, Homework, router, isStudent, isTeacher, isAuthenticated;
  express = require('express');
  Course = require('../models/courses');
  Content = require('../models/homeworkContent');
  Homework = require('../models/homework');
  router = express.Router();
  isStudent = function(req, res, next){
    if (req.user.character === 'student') {
      return next();
    } else {
      return res.write("You're not student!");
    }
  };
  isTeacher = function(req, res, next){
    if (req.user.character === 'teacher') {
      return next();
    } else {
      return res.write("you're not teacher!");
    }
  };
  isAuthenticated = function(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/');
    }
  };
  module.exports = router;
  router.get('/', isAuthenticated, function(req, res){
    var course_id;
    course_id = req.query.course;
    console.log(course_id);
    Course.findOne({
      _id: course_id
    }, function(err, course){
      var homeworks;
      console.log(course);
      homeworks = Homework.find({
        courseId: course._id
      }, function(err, homeworks){
        console.log(homeworks);
        res.render('homeworkList', {
          homeworks: homeworks,
          user: req.user,
          course: course
        });
      });
    });
  });
  router.get('/detail/:homeworkId', isAuthenticated, function(req, res){
    var user;
    user = req.user;
    Homework.findOne({
      _id: req.params.homeworkId
    }, function(err, homework){
      if (err) {
        console.log('Failed to find the homework');
      }
      if (user.character === 'teacher') {
        Content.find({
          course: homework._id
        }, function(err, contents){
          if (err) {
            console.log('No contents');
          }
          res.render('homeworkDetail', {
            contents: contents,
            user: user,
            homework: homework
          });
        });
      } else {
        Content.find({
          course: homework._id,
          writerId: user._id
        }, function(err, content){
          res.render('homeworkDetail', {
            conetent: content,
            user: user,
            homework: homework
          });
        });
      }
    });
  });
  router.get('/create', isAuthenticated, isTeacher, function(req, res){
    var courseId;
    courseId = req.query.courseId;
    console.log(courseId);
    return res.render('createHomework', {
      courseId: courseId
    });
  });
  router.post('/create/:courseId', isAuthenticated, isTeacher, function(req, res){
    var courseId;
    courseId = req.param.courseId;
    return Homework.findOne({
      name: req.params.name
    }, function(err, homework){
      var newHomework;
      console.log(req.params.courseId + "...");
      if (homework) {
        res.write("This homework has existed!");
      } else {
        newHomework = new Homework({
          name: req.param('name'),
          deadline: req.param('deadline'),
          content: req.param('content'),
          courseId: req.params.courseId
        });
        newHomework.save();
        res.redirect('/courses');
      }
    });
  });
  router.get('content/:contentId/', isAuthenticated, isTeacher, function(req, res){
    return Content.findOne({
      name: req.params.homeworkId
    }, function(err, homework){
      if (!content) {
        res.write('The homework doesn\'t exist!');
        res.end();
      } else {
        res.render('homeworkContent', {
          content: homework,
          user: user
        });
      }
    });
  });
  router.get("/:homeworkId/check", isAuthenticated, isTeacher, function(req, res){
    return Content.find({
      homeworkId: req.params.homeworkId
    }, function(err, contents){
      res.render('homeworkContentList', {
        contents: contents
      });
    });
  });
  router.get("/:contentId/enscore", isAuthenticated, isTeacher, function(req, res){
    Content.findOne({
      id: req.params.contentId
    }, function(err, content){});
    return res.render('enscoreHomework', {
      content: content
    });
  });
  router.post("/:contentId/enscore", isAuthenticated, isTeacher, function(req, res){
    var content;
    return content = Content.findOne({
      id: req.params.homeworkId
    });
  });
  router.post("/edit/:homeworkId/", isAuthenticated, isTeacher, function(req, res){
    return Homework.findOne({
      id: homeworkId
    }, function(err, homework){
      if (!homework) {
        res.write('The homework doesn\'t exist!');
        res.end();
      } else {
        homework.deadline = req.param('deadline');
        homework.instruction = req.param('instruction');
        homework.name = req.param('name');
        homeworks.save();
      }
    });
  });
  router.get("/write/:contentId", isAuthenticated, isStudent, function(req, res){
    return Content.findOne({
      writerId: req.user.id,
      _id: req.params.contentId
    }, function(err, content){
      if (!content) {
        content = new Content({
          homeworkId: req.query.homework,
          content: '',
          writerId: 'req.user.id'
        });
        console.log('A new content');
        content.save();
      }
      Homework.findOne({
        _id: content.homeworkId
      }, function(err, homework){
        console.log(homework);
        Course.findOne({
          _id: homework.courseId
        }, function(err, course){
          res.render('writeHomework', {
            user: req.user,
            courseName: course.name,
            content: content
          });
        });
      });
    });
  });
  router.post("/write/:contentId/", isAuthenticated, isStudent, function(req, res){
    return Content.findOne({
      writerId: req.user.id,
      homeworkId: req.params.homeworkId
    }, function(err, content){
      if (!content) {
        res.write('Error');
        res.end();
      } else {
        content.content = req.params('content');
        content.save();
        res.redirect('/homeworks');
      }
    });
  });
}).call(this);
