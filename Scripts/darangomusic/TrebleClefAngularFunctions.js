

var app = angular.module('angularTrebleClefApp', []);

app.controller('ctrlMusicKeys', function ($scope) {

    SetKeyDetails($scope);

});


function SetKeyDetails($scope) {

    $scope.KeyName = "D";
    $scope.Sharps = "0";
 

};


