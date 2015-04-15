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
    var user, homework;
    user = req.user;
    homework = Homework.findOne({
      id: req.params.homeworkId
    });
    if (user.character === 'teacher') {
      Content.find({
        course: homeworkId
      }, function(err, contents){
        res.render('homeworkDetail', {
          contents: contents,
          user: user,
          homework: homework
        });
      });
    } else {
      Content.find({
        course: homeworkId,
        writerId: writerId,
        _id: user._id
      }, function(err, content){
        res.render('homeworkDetail', {
          conetent: content,
          user: user,
          homework: homework
        });
      });
    }
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
        res.write('The homework doesn'.t(exist()['res.end!elseres.render '].homeworkContent[', content:homework, user:userrouter.get "/:homeworkId/check", is-authenticated, is-teacher, (req, res)->Content.find {homework-id:req.params.homework-id}, (err, contents)!->res.render '].homeworkContentList[', contents:contentsrouter.get "/:contentId/enscore", is-authenticated, is-teacher, (req, res)->Content.find-one {id: req.params.content-id}, (err, content)res.render '].enscoreHomework[', content:contentrouter.post "/:contentId/enscore", is-authenticated, is-teacher, (req, res)->content = Content.find-one {id: req.params.homework-id}router.post "edit/:homeworkId/", is-authenticated, is-teacher, (req, res)->Homework.find-one {id: homeworkId}, (err, homework)!->if not homeworkres.write '].The(homework(doesn['t exist!']))));
        res.end();
      } else {
        homework.deadline = req.param('deadline');
        homework.instruction = req.param('instruction');
        homework.name = req.param('name');
        homeworks.save();
      }
    });
  });
  router.get('write/:contentId/', isAuthenticated, isStudent, function(req, res){
    return Content.findOne({
      writerId: req.user.id,
      _id: req.params.contentId
    }, function(err, content){
      if (!content) {
        content = new Content({
          homeworkId: req.query.homeworkId,
          content: '',
          writerId: 'req.user.id'
        });
        content.save();
      }
      res.render('writeHomework', {
        user: user != null
          ? user
          : req.user,
        courseName: courseName != null
          ? courseName
          : course.name,
        content: content != null ? content : content
      });
    });
  });
  router.post('write/:contentId/', isAuthenticated, isStudent, function(req, res){
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
      }
    });
  });
}).call(this);
