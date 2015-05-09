angular.module('<%= module %>', ['schemaForm'])
       .controller('<%= controller %>', function($scope) {
  $scope.schema = {
    type: "object",
    properties: <%= properties %>
  };

  $scope.form = [
    "*",
    {
      type: "submit",
      title: "Save"
    }
  ];

  $scope.model = {};
}
