// (function () {

    // Error: [ng:areq] Argument 'TodoCtrl' is not a function, got undefined

var app = angular.module('controllerExample', [])
  .controller('TodoCtrl', ['$scope', TodoCtrl]);

function TodoCtrl($scope) {
    
    //angular module
    //  var TodoCtrl = angular.module('TodoCtrl', ['ngRoute']);
   // var app = angular.module('TodoCtrl', ['ngRoute']);
    // controller
    //     TodoCtrl.controller('TodoCtrl', function ($scope) {
   
    
        // function TodoCtrl($scope) {
        $scope.todos = [
            {
                text: 'Learn AngularJS',
                done: false
                    },
            {
                text: 'Build an app',
                done: false
                    }
    ];

        $scope.getTotalTodos = function () {
            return $scope.todos.length;
        };

        $scope.clearCompleted = function () {
            $scope.todos = _.filter($scope.todos, function (todo) {
                return !todo.done;
            });
        };

        $scope.addTodo = function () {
            $scope.todos.push({
                text: $scope.formTodoText,
                done: false
            });
            $scope.formTodoText = '';
        };
    }

console.log("type = "+Object.prototype.toString.call(TodoCtrl));
// })();