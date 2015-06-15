var namespaceMap = {
    "s": "http://schema.org/"
}

var dataUrl = "http://localhost:8088/data/sheldon.ttl";
var subject = "http://localhost:8080/data/person/sheldon-cooper";

var app = angular.module('AngularRDF', []);

// controller here
app.controller('rdfController', ['$scope', '$q', '$log',
    function ($scope, $q, $log) {

        //  .controller('LogController', ['$scope', '$log', function($scope, $log) {
        $scope.$log = $log;

        console.log("controller called");

        $scope.store = new rdf.LdpStore();

        // start node
        //   $scope.rdfNode = $scope.cf.node($scope.subject);

        // $scope.node = new Object();
        // $scope.givenName = "";
        //   $scope.familyName = "";

        $scope.data = {
            message: "Helloo"
        };

        // Angular has its own $http, see http://stackoverflow.com/questions/21667613/in-angular-how-to-pass-json-object-array-into-directive
        /*
            $scope.store.graph(dataUrl, function (graph) {
                $log.info("graph = \n" + graph);
                //   console.log(graph.toArray()[0].object.toString());
                $scope.turtleString = graph.toArray().join("\n").toString();
                $scope.$apply(); // trigger sync
                //   $log.info("loading cf...");
                // $scope.cf = rdf.cf.Store($scope.store); // clownface, for graph traversal

                //   $log.info("cf loaded" + cf);
                // console.log($scope.turtleString);
            });
            */

        $scope.store.graph(dataUrl, function (graph, error) {
            $scope.graph = graph;
            if (error) {
                console.log(error);
            } else {
                // note that graph.length is a value, not a function
                console.log("Successfully fetched %d triples", graph.length);
                $scope.turtleString = graph.toArray().join("\n").toString();
                         $scope.$apply(); // trigger sync
              //  $scope.$apply(); // trigger sync
                var knows = graph.match(null, 'http://schema.org/givenName', null);

                knows.forEach(function (triple) {
                    // iterate over the results, creating a filtered graph for each subject found
                    // and pass that graph to a display function

                    // complete triple in N-Triples notation
                    console.log("Triple:    " + triple.toString());

                    // and subject - predicate - object as strings
                    console.log("Subject:   " + triple.subject);
                    console.log("Predicate: " + triple.predicate);
                    console.log("Object:    " + triple.object);
                    console.log("---------------------------------------------------------------------");
                });


                // this one
                $scope.node = {};


                $scope.node.object = function (name, value) {

                    $log.info("paramsname = " + name + " value = " + value);

                    var split = name.split(":");
                    if (split.length > 1) {
                        name = namespaceMap[split[0]] + split[1];
                    }
                    console.log("name = " + name);
                    $log.info("name = " + name);
                    // $log.info("cf = " + $scope.cf);

                    if (angular.isDefined(value) && value != null) {

                        setLiteral(subject, name, value);
                        // return "r";
                    } else {
                        var objectNode = getLiteral(subject, name);
                        console.log("returning name = " + objectNode);

               
                        return objectNode;
                    }
                }

            }
        });

        /**
         * Represents a book.
         * @constructor
         * @param {string} title - The title of the book.
         * @param {string} author - The author of the book.
         * @returns {Number}
         */
        function getLiteral(s, p) {
            $log.info("getLiteral called with s=" + s + " p=" + p);

            var matches = $scope.graph.match(s, p, null);
//            console.log("matches = " + matches.length);

            /*
            matches.forEach(function (triple) {
                // iterate over the results, creating a filtered graph for each subject found
                // and pass that graph to a display function

                // complete triple in N-Triples notation
                console.log("Triple:    " + triple.toString());

                // and subject - predicate - object as strings
                console.log("Object:   " + triple.subject);
            }
                            */
            matches = matches.toArray();
            var o = matches[0].object.toString();
            console.log("o = "+o);
            return o;

            // clownface lookup
            // .out should search subject->object', function () {
            //  $log.info("getLiteral $scope.cf = " + $scope.cf);
            /*
            $scope.cf.node(s, null, function (result) {
                var resultArray = result.out(p).nodes();
                return resultArray[0].toString();
            });
            */
        }

        // test it clears multiple values in graph
        function setLiteral(s, p, o) {
            $log.info("setLiteral called with s=" + s + " p=" + p + " o=" + o);
            // check o is a string
        //    $scope.graph.removeMatches(s, p, null);
            $scope.store.add(s, p, o);
        }

        /*
            //  $log.info("setLiteral $scope.cf=" + $scope.cf);
            if (getLiteral(s, p)) {
                $scope.cf.node(s).removeOut(p);
            }

            // add new triple
            $scope.cf.node(o, null, function (result) {
                // anything?
            })
                .catch(function (error) {
                    $log.info("error: " + error);
                });
                */

                }]);









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