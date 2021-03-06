'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TeamManagementCtrl
 * @description
 * # TeamManagementCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TeamManagementCtrl', ['$scope', '$http', '$mdDialog',
    function ($scope, $http, $mdDialog) {

    $scope.initFirst = function() {

      $scope.student = null;
      $scope.students = null;
      $scope.studentList = null;
      $scope.team = null;
      $scope.teams = null;
      $scope.teamList = null;
      $scope.client = null;
      $scope.clients = null;
      $scope.clientList = null;
      $scope.advisor = null;
      $scope.advisors = null;
      $scope.advisorList = null;

      $scope.courseList = [
        { name: "190"},
        { name: "191"},
        { name: "Retired"}
      ]

      $scope.selected = [];

      $scope.status = '';
      $scope.customFullscreen = false;

      $scope.showMigrateConfirm = function(ev) {
        var confirm = $mdDialog.confirm({
          onComplete: function afterShowAnimation() {
            var $dialog = angular.element(document.querySelector('md-dialog'));
            var $actionsSection = $dialog.find('md-dialog-actions');
            var $cancelButton = $actionsSection.children()[0];
            var $confirmButton = $actionsSection.children()[1];
            angular.element($confirmButton).addClass('md-primary md-raised');
            angular.element($cancelButton).addClass('');
          }
        })
          .title('Are you sure you would like to migrate teams?')
          .textContent('')
          .ariaLabel('Migrate teams')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          $scope.status = 'You migrated the teams.';
          $http({
            url: '/api/migrateteams',
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
          })
          $scope.initFirst();
        });
      };

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
       $scope.createteam = function() {
         $scope.statusMsg = 'Sending data to server...';
         var Indata = {'param1': $scope.team, 'param2': $scope.course, 'param3': $scope.advisor,
             'param4': $scope.client, 'param5': $scope.studentOne, 'param6': $scope.studentTwo,
             'param7': $scope.studentThree, 'param8': $scope.studentFour, 'param9': $scope.studentFive,
             'param10': $scope.studentSix};
         $http({
           url: '/api/createteam',
           method: 'POST',
           data: Indata,
           headers: {'Content-Type': 'application/json'}
         })
         $scope.initFirst();
         $mdDialog.hide();
       };
     }

     $scope.showDelete = function(ev, team) {
       $mdDialog.show({
         controller: DeleteController,
         templateUrl: 'dialog3.tmpl.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         scope: $scope.$new(), // Uses prototypal inheritance to gain access to parent scope
         clickOutsideToClose:false,
         locals: {
           selectedTeam: team
         },
         fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
       })
       .then(function() {
       }, function() {
         $scope.status = 'You cancelled the dialog.';
       });
     };

      function DeleteController($scope, $mdDialog, selectedTeam) {
       $scope.team = selectedTeam;
       $scope.hide = function() {
         $mdDialog.hide();
       };
       $scope.cancel = function() {
         $mdDialog.cancel();
       };
       $scope.deleteteam = function() {
         $scope.statusMsg = 'Sending data to server...';
          $http({
            url: '/api/deleteteam',
            method: 'POST',
            data: $scope.team,
            headers: {'Content-Type': 'application/json'}
          })
          $mdDialog.hide();
          $scope.initFirst();
        };
      }

     $scope.showEdit = function(ev, team, course, advisor, client, studentList) {

       $mdDialog.show({
         controller: EditController,
         templateUrl: 'dialog2.tmpl.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         scope: $scope.$new(), // Uses prototypal inheritance to gain access to parent scope
         clickOutsideToClose:false,
         locals: {
           selectedTeam: team,
           selectedCourse: course,
           selectedAdvisor: advisor,
           selectedClient: client,
           selectedStudentList: studentList
         },
         fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
       })
       .then(function() {
       }, function() {
         $scope.status = 'You cancelled the dialog.';
         $scope.initFirst();
       });
     };

      function EditController($scope, $mdDialog, selectedTeam, selectedCourse, selectedAdvisor, selectedClient,
        selectedStudentList) {
       $scope.team = selectedTeam;
       $scope.course = selectedCourse;
       $scope.advisor = selectedAdvisor;
       $scope.client = selectedClient;
       $scope.studentList = selectedStudentList;

       $scope.teamMembers = [];
       for (var i = 0; i < $scope.studentList.length; i++) {
         if ($scope.studentList[i].team === $scope.team.team_id) {
           $scope.teamMembers.push($scope.studentList[i]);
         }
       };

       $scope.studentOne = $scope.teamMembers[0];
       $scope.studentTwo = $scope.teamMembers[1];
       $scope.studentThree = $scope.teamMembers[2];
       $scope.studentFour = $scope.teamMembers[3];
       $scope.studentFive = $scope.teamMembers[4];
       $scope.studentSix = $scope.teamMembers[5];

       $scope.hide = function() {
         $mdDialog.hide();
       };
       $scope.cancel = function() {
         $mdDialog.cancel();
       };
       $scope.editteam = function() {
         $scope.statusMsg = 'Sending data to server...';
         var Indata = {'param1': $scope.team, 'param2': $scope.course, 'param3': $scope.advisor,
             'param4': $scope.client, 'param5': $scope.studentOne, 'param6': $scope.studentTwo,
             'param7': $scope.studentThree, 'param8': $scope.studentFour, 'param9': $scope.studentFive,
             'param10': $scope.studentSix};
          $http({
            url: '/api/editteam',
            method: 'POST',
            data: Indata,
            headers: {'Content-Type': 'application/json'}
          })
          $scope.initFirst();
          $mdDialog.hide();
        };
      }

      var req = $http.get('/api/getstudents');
      var scope = this;
      req.then(function (res) {
        $scope.studentList = res.data.student;
        console.log(res);
      });
      req.catch(function(err) {
        console.log(err);
      });

      var req = $http.get('/api/getteams');
      var scope = this;
      req.then(function (res) {
        $scope.teamList = res.data.team;
        console.log(res);
      });
      req.catch(function(err) {
        console.log(err);
      });

      var req = $http.get('/api/getclients');
      var scope = this;
      req.then(function (res) {
        $scope.clientList = res.data.client;
        console.log(res);
      });
      req.catch(function(err) {
        console.log(err);
      });

      var req = $http.get('/api/getadvisors');
      var scope = this;
      req.then(function (res) {
        $scope.advisorList = res.data.advisor;
        console.log(res);
      });
      req.catch(function(err) {
        console.log(err);
      });

      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }
}])

  .config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('mcgpalette0', {
      '50': 'e1e7e5',
      '100': 'b4c4be',
      '200': '829c93',
      '300': '4f7468',
      '400': '2a5747',
      '500': '043927',
      '600': '033323',
      '700': '032c1d',
      '800': '022417',
      '900': '01170e',
      'A100': '57ff9d',
      'A200': '24ff7f',
      'A400': '00f064',
      'A700': '00d659',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': [
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900'
      ]
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('mcgpalette0', {
        'default': '500'
      })
      .accentPalette('grey');
    $mdThemingProvider.theme('docs-dark')
      .primaryPalette('yellow')
      .dark();
  })
