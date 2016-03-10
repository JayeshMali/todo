var myApp = angular.module('demoApp', ['ngTagsInput']);

myApp.controller('myController', function($scope, $http) {

  $scope.list = [];
  $scope.myVar;
  $scope.finish = [];
  var i = 0;
  $scope.jsonObj = angular.toJson($scope.list);

  $scope.getData=function()
  {
    console.info("inside getData");
    $http.get("http://localhost:3000/todo/index.json")
     .then(function(response) {
         $scope.list = response.data;
        console.info($scope.list);
           });
    }


$scope.content={
  tag_name:[]
};


  $scope.addDescription = function(task, info, myTag) {
console.info(task);
console.info(info);
console.info("myTag "+myTag);

console.info("myTag.length "+myTag.length);
console.info("myTag[0] "+myTag[0].text);
for(var i=0;i<myTag.length;i++)
  $scope.content.tag_name.push(myTag[i].text);
$scope.content.name=task;
$scope.content.detail=info;
console.info("tag names"+$scope.content.tag_name);
console.info($scope.content);
var val= $http({
     method: 'POST',
     url: 'http://localhost:3000/todo/create',
     data: $scope.content
     //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 });

$scope.getData();
  }

  $scope.delete = function() {
    var myList = $scope.list;
    $scope.list = [];
    angular.forEach(myList, function(val, key) {

      if (!val.status)
        $scope.list.push(val);
      else
        $scope.finish.push(val);
    });
  }

  $scope.editDescription = function(task,info)
  {
    $scope.item=task;
    $scope.detail=info;
  }

  $scope.complete = function() {

    $scope.jsonObj = angular.toJson($scope.list);
    alert($scope.jsonObj);
  }

  $scope.clicked = function(val,tName) {
    $scope.myVar = val;
    $scope.item=JSON.stringify(tName.name);
  }

  $scope.close=function(item){
   console.info(item);
   $http({
        method: 'POST',
        url: 'http://localhost:3000/todo/delete',
        data: item

    });
    $scope.getData();
    console.info($scope.list);
 }

  $scope.showCompleted = function() {
    var len = $scope.finish.length;
    if (len !== 0)
      $scope.json = angular.toJson($scope.finish);
  }

  $scope.check = function() {
    alert();
    //var myEl = angular.element(document.querySelector('#txt'));
    if($scope.item!="")
      myEl.attr('modal', "#desModal");
  }

  $scope.updateStatus=function(item){
    console.info("item.status "+item.status);
    $http({
         method: 'POST',
         url: 'http://localhost:3000/todo/update',
         data: item
     });
     $scope.getData();
  }

}); //end of controller
