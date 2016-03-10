var myApp = angular.module('demoApp', ['ngTagsInput']);

myApp.controller('myController', function($scope, $http) {

  $scope.updateContent={};


  $scope.list = [];
  $scope.myVar;
  $scope.myContents = {};

  $scope.finish = [];
  var i = 0;

  $scope.getData=function()
  {
    console.info("inside getData");
    $http.get("http://localhost:3000/todo/index.json")
     .then(function(response) {
         $scope.list = response.data;
        console.info($scope.list);
           });
    }

$scope.taskName="";
  $scope.addItem = function(task) {
    console.info("Task Name: "+task);
    $scope.taskName=task;

    $scope.item = "";
    $scope.detail = "";
    $scope.subTag = "";
    $scope.myVar = i;

    i++;
}

$scope.content={
  tag_name:[]
};

$scope.addDescription = function(task, info, myTag) {
console.info("Task Name: "+$scope.taskName);
console.info(info);
console.info("myTag "+myTag);
console.info("myTag.length "+myTag.length);
console.info("myTag[0] "+myTag[0].text);
for(var i=0;i<myTag.length;i++)
$scope.content.tag_name.push(myTag[i].text);
$scope.content.name=$scope.taskName;
$scope.content.detail=info;
console.info("tag names"+$scope.content.tag_name);
console.info("CONTENT");
console.info($scope.content);
var val= $http({
   method: 'POST',
   url: '/todo/create',
   data: $scope.content
   //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
$scope.getData();
}


  $scope.delete = function() {
    var myList = $scope.list;
    $scope.list = [];
    angular.forEach(myList, function(val, key) {
      console.info(val.status);
      if (!val.status)
        $scope.list.push(val);
      else
        $scope.finish.push(val);
    });
    $scope.update($scope.finish);
  }

  $scope.editDescription = function(myTag, info) {
    $scope.content.tag_name=[];
    console.info("Update content "+$scope.updateContent);
     console.info("id  "+$scope.updateContent.id)
    console.info("Task Name: "+$scope.str);
    console.info(info);
    console.info("myTag "+myTag);
    console.info("myTag.length "+myTag.length);
    console.info("myTag[0] "+myTag[0].text);
    for(var i=0;i<myTag.length;i++)
    $scope.content.tag_name.push(myTag[i].text);
    $scope.content.name=$scope.str;
    $scope.content.detail=info;
    $scope.content.id=$scope.updateContent.id;
    console.info("tag names "+$scope.content.tag_name[0]);
    console.info("CONTENT");
    console.info($scope.content);
    console.info($scope.subTag);
    console.info(myTag);
    var val= $http({
       method: 'POST',
       url: '/todo/update',
       data: $scope.content
       //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    $scope.getData();

  }

  $scope.complete = function() {

    $scope.jsonObj = angular.toJson($scope.list);
    alert($scope.jsonObj);
  }

  $scope.close=function(item){
 console.info(item);
 $http({
      method: 'POST',
      url: '/todo/delete',
      data: item

  });
  $scope.getData();
  console.info($scope.list);
}


 $scope.clicked = function(item) {
   $scope.updateContent=item;
   console.info("In CLICKED");
    // console.info("List "+list);
    // console.info("index "+index);
    console.info(item);
    console.info("Item tags"+item.detail);
    console.info("Item Tags "+item.tags);
    console.info("Item Tags "+item.tags.length);
    $scope.myTags=[];
    for(var i=0;i<item.tags.length;i++)
      {
        $scope.tags={};
        $scope.tags.text=item.tags[i].name;
        $scope.myTags.push($scope.tags);
      }
      console.info($scope.myTags);


     $scope.str = item.name;
        $scope.detail = item.detail;
        $scope.subTag=$scope.myTags;


  }


  $scope.showCompleted = function() {
    console.info("inside getData");
    $http.get("/todo/status_true.json")
     .then(function(response) {
         $scope.list = response.data;
        console.info($scope.list);
           });
  }

  $scope.update=function(list){
    console.info("list "+list);
    angular.forEach(list, function(val, key) {
      console.info(val);
      $http({
           method: 'POST',
           url: '/todo/delete',
           data: val
       });
    });


  }

  $scope.updateStatus = function(task) {
    console.info(task.status);
    $http({
         method: 'POST',
         url: '/todo/edit',
         data: task
     });
     $scope.getData();

  }


}); //end of controller
