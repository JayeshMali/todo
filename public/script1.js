    var app = angular.module("app", []);
    app.controller("HttpGetController", function ($scope, $http) {

console.info("In controller");
$scope.content1={
  name:"aaa",
  detail:"bbb",
tag_name:[]
}
$scope.tags=['tag1','tag2','tag3'];
console.info($scope.tags[0]);

$scope.name="jayesh";
$scope.content1.tag_name=$scope.tags;

// $http.get("http://localhost:3000/todo/index.json")
//  .then(function(response) {
//      $scope.content = response.data;
//
//     console.info($scope.content);
//        });

//$scope.content.tag_name=$scope.tag_name;

        $scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON
           console.info($scope.content1);
          // var data=$scope.task_name;



           var val= $http({
                method: 'POST',
                url: 'http://localhost:3000/todo/create',
                data: $scope.content1
                //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
          //   console.info("value of val "+val);



            //
            // $http.post('http://localhost:3000/todo/create', $scope.content1)
            // .success(function (data, status, headers, config) {
            //     //$scope.PostDataResponse = data;
            //     console.info("Success");
            //
            //
            // })
            // .error(function (data, status, header, config) {
            //     // $scope.ResponseDetails = "Data: " + data +
            //     //     "<hr />status: " + status +
            //     //     "<hr />headers: " + header +
            //     //     "<hr />config: " + config;
            //     console.info("Error");
            //
            // });


        };


    });
