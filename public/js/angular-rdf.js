angular.module('AngularRDF', [])

// controller here
.controller('rdfController', function ($scope) {

    $scope.dataUrl = "http://localhost:8088/data/sheldon.ttl";
    $scope.subject = "http://localhost:8080/data/person/sheldon-cooper";

    $scope.store = new rdf.LdpStore();
    // $scope.node = new Object();
    // $scope.givenName = "";
    //   $scope.familyName = "";

    $scope.data = {
        message: "Hello"
    };


    $scope.store.match("http://localhost:8088/data/sheldon.ttl",
        null,
        null,
        null,
        function (graph) {
         //   console.log(graph.toArray()[0].object.toString());
            $scope.turtleString = graph.toArray().join("\n").toString();
            $scope.$apply();
        // console.log($scope.turtleString);
        }
    );



    $scope.double = function (value) {
        return value * 2;
    };

    /*
    $scope.pageModel.firstName = '';
$scope.pageModel.myGetterSetterFunc: function (value) {
*/
    $scope.model = new Object();

    $scope.model.givenNameGS = function (value) {

        if (angular.isDefined(value)) {
            $scope.model.givenName = value;
        }
        return $scope.model.givenName;
    };

    $scope.model.familyNameGS = function (value) {

        if (angular.isDefined(value)) {
            $scope.model.familyName = value;
        }
        return $scope.model.familyName;

    };

});




/*
angular.module('controllerAsExample', [])
  .controller('SettingsController1', SettingsController1);

function SettingsController1() {
  this.name = "John Smith";
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'} ];
}


var app = angular.module('myApp', []);
    var store = new rdf.LdpStore();
    store.match("http://tbbt.zazukoians.org/data/person/sheldon-cooper",
                    null,
                    null,
                    null,
                    function (data) {
    console.log(data.toString());
    app.controller('personCtrl', RdfNode(data, "http://tbbt.zazukoians.org/data/person/sheldon-cooper"));
});


// in this example we create an LdpStore as this one is able to fetch external URIs
var store = new rdf.LdpStore();

// we use the store.graph() function to resolve an external URI
// the callback returns a RDF Interface graph object
store.graph('http://www.w3.org/People/Berners-Lee/card', function(graph, error){

  if(error)
  {
    console.log(error);
  } else {
    // note that graph.length is a property, not a function
    console.log("Successfully fetched %d triples", graph.length);
  }
});
*/