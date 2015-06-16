var namespaceMap = {
    "s": "http://schema.org/"
}

var dataUrl = "http://localhost:8088/data/sheldon.ttl";
var subject = "http://localhost:8080/data/person/sheldon-cooper";

var app = angular.module('AngularRDF', []);

app.directive("myDirective", function () { // not yet used
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
     //   $scope.$log = $log;

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

            $log.info("graph size = " + $scope.store.graph.length);
     
            if (error) {
                console.log(error);
            } else {
                if(!$scope.graph || $scope.store.graph.length == 0) { // hacky temp - shouldn't be re-loading the data
                $scope.graph = graph;
                }
                console.log("Successfully fetched %d triples", graph.length);

                // render data
                $scope.turtleString = $scope.graph.toArray().join("\n").toString();
                $scope.$apply(); // trigger sync

                $scope.node = {};

                // two slightly different versions, both fairly close

                $scope.node.x = function (value) {

                    var name = $attrs.property; // sometimes it works, sometimes it doesn't !??
                     if (!name || (typeof (name) == "undefined") || ("" + name) == "undefined") {
                         return;
                     }
                    $log.info("value  in node.x = " + value);

                    var split = name.split(":");
                    if (split.length > 1) {
                        name = namespaceMap[split[0]] + split[1];
                    }

                    $log.info("name = " + name);
                    // $log.info("cf = " + $scope.cf);

                    if (value && (typeof (value) != "undefined") && ("" + value) != "undefined") {
                        $log.info("calling setLiteral with " + subject + "  " + name + "  " + value);
                        setLiteral(subject, name, value);
                        $scope.turtleString = $scope.graph.toArray().join("\n").toString();
                      //  $scope.$apply(); // trigger sync
                        $log.info("after setter \n" + $scope.turtleString);
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
            console.log("matches = " + matches.length);
            matches = matches.toArray();

            var o = matches[0].object.toString();
            console.log("getLiteral o = " + o);
            return o;
        }

        // test it clears multiple values in graph
        function setLiteral(sString, pString, oString) {
            $log.info("setLiteral called with s=" + sString + " p=" + pString + " o=" + oString);
            // todo : check o is a string

            $scope.graph.removeMatches(sString, pString, null);
            // $log.info("after remove \n" + $scope.turtleString);
            
            // $scope.graph.add(new rdf.Triple(s, p, o));
            var s = new rdf.NamedNode(sString);
            var p = new rdf.NamedNode(pString);
            var o = new rdf.Literal(oString);
            $scope.graph.add(new rdf.Triple(s, p, o));
         //   $scope.graph.add(sString, pString, oString);
            $log.info("after add \n" + $scope.turtleString);
            $scope.turtleString = $scope.graph.toArray().join("\n").toString();
            //   $scope.$apply(); // trigger sync
        }
}]);