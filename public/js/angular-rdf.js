var namespaceMap = {
    "s": "http://schema.org/"
}

var dataUrl = "http://localhost:8088/data/sheldon.ttl";
var subject = "http://localhost:8080/data/person/sheldon-cooper";

var app = angular.module('AngularRDF', []);

app.directive("myDirective", function () {
    return {
        restrict: "A",
        scope: {
            two: "="
        }
    };
});

// controller here
app.controller('rdfController', ['$scope', '$attrs', '$q', '$log',
    function ($scope, $attrs, $q, $log) {

        $log.info("PROPERTY = " + $attrs.property);

        //  .controller('LogController', ['$scope', '$log', function($scope, $log) {
        $scope.$log = $log;

        console.log("controller called");

        $scope.store = new rdf.LdpStore();

        $scope.data = {
            message: "Helloo"
        };

        // Angular has its own $http, see http://stackoverflow.com/questions/21667613/in-angular-how-to-pass-json-object-array-into-directive

        /**
         * Represents a book.
         * @constructor
         * @param {string} title - The title of the book.
         * @param {string} author - The author of the book.
         * @returns {Number}
         */
        $scope.store.graph(dataUrl, function (graph, error) {
            $scope.graph = graph;
            if (error) {
                console.log(error);
            } else {
               
                console.log("Successfully fetched %d triples", graph.length);
                
                 // render data
                $scope.turtleString = graph.toArray().join("\n").toString();
                $scope.$apply(); // trigger sync

                $scope.node = {};
                
                $scope.node.x = function (value) {
                    
                    var name = $attrs.property;
                    $log.info("value  in node.x = " + value);

                    var split = name.split(":");
                    if (split.length > 1) {
                        name = namespaceMap[split[0]] + split[1];
                    }

                    $log.info("name = " + name);
                    // $log.info("cf = " + $scope.cf);
                    $log.info("calling setLiteral with " + subject + "  " + name + "  " + value);
                    if (value) { // angular.isDefined(value) && 

                        setLiteral(subject, name, value);
                        // return "r";
                    } else {
                        var objectNode = getLiteral(subject, name);
                        console.log("returning name = " + objectNode);


                        return objectNode;
                    }
                }

                $scope.node.object = function (name, value) {
                    var name = $attrs.property;
                    $log.info("value in node.object = " + value+ " name = "+name);

                    var split = name.split(":");
                    if (split.length > 1) {
                        name = namespaceMap[split[0]] + split[1];
                    }

                    $log.info("name = " + name);
                    // $log.info("cf = " + $scope.cf);
                    $log.info("calling setLiteral with " + subject + "  " + name + "  " + value);
                    if (value && (typeof(value) != "undefined") && (""+value) != "undefined") { // angular.isDefined(value) && 

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


        function getLiteral(s, p) {
            $log.info("getLiteral called with s=" + s + " p=" + p);

            var matches = $scope.graph.match(s, p, null);
            //            console.log("matches = " + matches.length);
            matches = matches.toArray();
            var o = matches[0].object.toString();
            console.log("getLiteral o = " + o);
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
        function setLiteral(sString, pString, oString) {
            $log.info("setLiteral called with s=" + sString + " p=" + pString + " o=" + oString);
            // todo : check o is a string
            var s = rdf.createNamedNode(sString)
            var p = rdf.createNamedNode(pString);
            var o = rdf.createLiteral(oString, null, null);

            $scope.graph.removeMatches(s, p, null);
            $scope.store.add(s, p, o);
        }
}]);