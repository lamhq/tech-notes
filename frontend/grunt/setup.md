# Setting Up Grunt

## Installation

### Install grunt-cli:

```
npm install -g grunt-cli
```

### Install grunt:

```
cd my-project/
npm install grunt --save-dev
```

### Create Gruntfile.js

Sample content for Gruntfile.js:

```
module.exports = function(grunt) {
	grunt.registerTask('default', function() {
		console.log('grunt task.');
	});
};
```

### Create task

Reference: [https://gruntjs.com/configuring-tasks#task-configuration-and-targets](https://gruntjs.com/configuring-tasks#task-configuration-and-targets)

#### Create Single task

```
module.exports = function(grunt) {
	grunt.initConfig({
		default: {
			foo: 123
		}
	});
	grunt.registerTask('default', function() {
		grunt.config.requires('default.foo');

		var foo = grunt.config('default.foo');
		console.log(foo);
		
		grunt.config('default.foo', 15);
	});
};
```

#### Create Multi task

```
module.exports = function(grunt) {
	grunt.initConfig({
		default: {
			options: {
				foo: 1
			},
			target1: {
				// override default option
				options: {
					bar: 2
				}
			},
			target2: {
			}
		}
	});

	grunt.registerMultiTask('default', function() {
		console.log(this.options());
	});
};
```

#### Create Alias Task
```
grunt.registerTask('default', 'Build files for frontend',
		['htmlmin', 'copyLayout', 'copyAsset', 'cssmin', 'uglify']);
```

### Run task

Gruntfile.js

```
module.exports = function(grunt) {
	grunt.initConfig({
		default: {
			target1: {},
			target2: {}
		},
		task1: {
			target1: {},
			target2: {}
		}
	});

	grunt.registerMultiTask('default', function() {
		console.log(this.target);
	});

	grunt.registerMultiTask('task1', function(p1, p2) {
		console.log('p1 is: '+p1);
		console.log('p2 is: '+p2);
	});
};
```

### Display availabe task
```
grunt -h
```

### Run `default` task with all targets

```
grunt
```

### Run a specific task with specific target and arguments

```
grunt task1:target1:aaa:bbb
```

### Specify runtime options

```
grunt task1:target1:aaa:bbb --bar
grunt task1:target1:aaa:bbb --bar=5
```

### Run task inside a task (Programmatically)

```
grunt.registerTask('check', function() {
	grunt.task.run('jshint');
});
```

### Offcial plugin

The Grunt team's plugins are prefxed with `grunt-contrib-`, whereas plugins
created by the rest of the community are simply prefxed with `grunt-`