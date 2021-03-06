'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StudentsCtrl
 * @description
 * # StudentsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StudentsCtrl', ['$scope', '$http', '$mdDialog', '$state', function ($scope, $http, $mdDialog, $state) {

  //$scope.downloadlink = 
  var req = $http.get('/api/getstudents');
  var scope = this;
  req.then(function (res) {
    scope.studentNames = res.data.student;
    console.log(res);
  });
  req.catch(function (err) {
    console.log(err);
  });

  $scope.showCreate = function(ev) {
    $mdDialog.show({
      controller: CreateController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope: $scope.$new(), // Uses prototypal inheritance to gain access to parent scope
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function() {
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function CreateController($scope, $mdDialog) {
    $scope.hide = function() {
    $mdDialog.hide();
    };
    $scope.cancel = function() {
    $mdDialog.cancel();
    };
    $scope.addstudent = function(new_student) {
      //console.log('Add student ' + new_student.name + ' ' + new_student.email);
      var req = $http.post('/api/addstudent/', new_student);
      req.then(function (res) {
      });
      req.catch(function (err) {
        console.log(err);
      });
      //$scope.initFirst();
      $mdDialog.hide();
      $state.reload();
    }
  }

  // $scope.addstudent = function(new_student) {
  //   //console.log('Add student ' + new_student.name + ' ' + new_student.email);
  //   var req = $http.post('/api/addstudent/', new_student);
  //   req.then(function (res) {
  //   });
  //   req.catch(function (err) {
  //     console.log(err);
  //   });
  //   $state.reload();
  // }

  $scope.deletestudent = function(student_id) {
    //console.log('Delete student cntrl - id = ' + student_id);
    var data = { id: student_id };
    var req = $http.post('/api/deletestudent/', data);
    req.then(function (res) {
    });
    req.catch(function (err) {
      console.log(err);
    });
    $state.reload();
  };

  $scope.edit = function(field) {
    $scope.newField = {};
    $scope.newField = angular.copy(field);
  }

  $scope.editstudent = function(student) {
    console.log('Edit student =' + student.name);
    var data = {
      id: student._id,
      name: student.name,
      email: student.email,
    };
    var req = $http.post('/api/editstudent/', data);
    req.then(function (res) {
    });
    req.catch(function (err) {
      console.log(err);
    });
    $state.reload();
  }

  $scope.upload = function() {
    var file = $scope.myFile;
    var uploadUrl = "/api/uploadstudents";
    var fd = new FormData();
    fd.append('file', file);

    $http.post(uploadUrl,fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
    .then(function(res) {
      console.log("success!!");
    })
    .catch(function(err){
      console.log(err);
    });

    $state.reload();
  }
}]);
