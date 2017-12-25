## Angular style guide rules

Define 1 component per file, recommended to be less than 400 lines of code. [Y001]
Wrap Angular components in an Immediately Invoked Function Expression (IIFE) [Y010]
Use named functions instead of passing an anonymous function in as a callback. [Y024]


### Controllers
Use a capture variable for `this` when using the controllerAs syntax. [Y032]
Place bindable members at the top of the controller [Y033] & [Y034]
Defer Controller Logic to Services [Y035]


### Factory
Accessible Members Up Top [Y052]
Function Declarations to Hide Implementation Details [Y053]


### Data Services
Separate Data Calls [Y060]


### Directives & Component
Limit 1 Per File [Y070]
Provide a Unique Directive Prefix [Y073]
Restrict to Elements and Attributes [Y074]


### Resolving Promise
Resolve start-up logic for a controller in an activate function. [Y080]


### Manually Identify Dependencies
Use $inject to manually identify your dependencies for Angular components. [Y091]
Manually Identify Route Resolver Dependencies [Y092]


### Minification and Annotation
Use ng-annotate for Gulp or Grunt and comment functions that need automated dependency injection using /* @ngInject */ [Y100]
use the ngApp directive's ngStrictDi parameter to detect any potentially missing minification safe dependencies. `<body ng-app="APP" ng-strict-di>`


### Exception Handling
Use a decorator, on the $exceptionHandler service to perform custom actions when exceptions occur. [Y110]


### Comments
If planning to produce documentation, use jsDoc syntax to document function [Y220]