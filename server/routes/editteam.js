var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var hostname = "localhost:9000";

router.post('/', function(req, res) {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('database/chex.db');

  // team name
  var team = req.body.param1;
  // course
  var course = req.body.param2.name;
  // tb generated
  // advisor
  // advisor
  if (req.body.param3 != null) {
    var advisorId = req.body.param3.advisor_id;
  }
  // client
  if (req.body.param4 != null) {
    var clientId = req.body.param4.client_id;
  }
  // studentOne
  if (req.body.param5 != null) {
    var studentOne = req.body.param5.student_id;
  }
  // studentTwo
  if (req.body.param6 != null) {
    var studentTwo = req.body.param6.student_id;
  }
  // studentThree
  if (req.body.param7 != null) {
    var studentThree = req.body.param7.student_id;
  }
  // studentFour
  if (req.body.param8 != null) {
    var studentFour = req.body.param8.student_id;
  }
  // studentFive
  if (req.body.param9 != null) {
    var studentFive = req.body.param9.student_id;
  }
  // studentSix
  if (req.body.param10 != null) {
    var studentSix = req.body.param10.student_id;
  }

db.serialize(function() {

  db.all('UPDATE STUDENT SET TEAM_ID = null WHERE TEAM_ID = ?', team.team_id, function(err, result) {
    if (err) throw err;
  });

  db.run(
    'UPDATE STUDENT SET TEAM_ID = ? WHERE STUDENT_ID = ?',
     team.team_id, studentOne, function(err, result) {
       if (err) throw err;
  });

  db.run(
    'UPDATE STUDENT SET TEAM_ID = ? WHERE STUDENT_ID = ?',
     team.team_id, studentTwo, function(err, result) {
       if (err) throw err;
  });

  db.run(
    'UPDATE STUDENT SET TEAM_ID = ? WHERE STUDENT_ID = ?',
     team.team_id, studentThree, function(err, result) {
       if (err) throw err;
  });

  db.run(
    'UPDATE STUDENT SET TEAM_ID = ? WHERE STUDENT_ID = ?',
     team.team_id, studentFour, function(err, result) {
       if (err) throw err;
  });

  db.run(
    'UPDATE STUDENT SET TEAM_ID = ? WHERE STUDENT_ID = ?',
     team.team_id, studentFive, function(err, result) {
       if (err) throw err;
  });

  db.run(
    'UPDATE STUDENT SET TEAM_ID = ? WHERE STUDENT_ID = ?',
     team.team_id, studentSix, function(err, result) {
       if (err) throw err;
  });

  db.run(
    'UPDATE TEAM SET NAME = ? WHERE ID = ?',
    team.name, team.team_id, function(err, result) {
      if (err) throw err;
    });

  db.run(
    'UPDATE TEAM SET ADVISOR_ID = ? WHERE ID = ?',
    advisorId, team.team_id, function(err, result) {
      if (err) throw err;
    });

  db.run(
    'UPDATE TEAM SET CLIENT_ID = ? WHERE ID = ?',
    clientId, team.team_id, function(err, result) {
      if (err) throw err;
  });

  db.run(
    'UPDATE TEAM SET COURSE = ? WHERE ID = ?',
    course, team.team_id, function(err, result) {
      if (err) throw err;
  });

})

  db.close();
  res.sendStatus(200);
});
module.exports = router;
