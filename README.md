## AngularRDF

**_AngularJS bindings for RDF_**

### Installation

First you'll need a clone of this repository:

**`git clone https://github.com/danja/angular-rdf.git`**

This should create a directory `angular-rdf`, move into it:

**`cd angular-rdf`**

### Demo Installation 

* a fairly minimal node.js HTTP server on Node.js. To use it, you should first [install node](https://nodejs.org/) *

The following isn't needed to use AngularRDF (just the material above), but may be found useful for development. It will run a demo in a pseudo-live setting with debugging support.

Then install this (angular-rdf) with dependencies, in the `angular-rdf` dir:

**`npm install`-d`**

**`npm start`**

Point a browser at:

**`[http://localhost:8088/](http://localhost:8088/)`**

- and you should see the demo application.

#### Tests

* "Protractor is an end-to-end test framework for AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.", see https://angular.github.io/protractor/ and http://www.ng-newsletter.com/posts/practical-protractor.html *

**`npm install -g -d protractor`**

Try running protractor --version to make sure it's working.

**`sudo webdriver-manager update`**

[[ if it hangs, try **`sudo apt-get haveged`** a *userspace entropy daemon* and reinstalling protractor etc. - Selenium uses blocking random numbers source and hangs when kernel has no entropy, see https://code.google.com/p/selenium/issues/detail?id=8237#makechanges ]]

then 

**`webdriver-manager start`**






