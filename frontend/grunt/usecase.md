# Common usecases

## Different build base on environment

```
var env = grunt.option('env') || 'dev';

// Environment specific tasks
if(env === 'prod') {
	grunt.registerTask('scripts', ['coffee', 'uglify']);
	grunt.registerTask('styles', ['stylus', 'cssmin']);
	grunt.registerTask('views', ['jade', 'htmlmin']);
} else {
	grunt.registerTask('scripts', ['coffee']);
	grunt.registerTask('styles', ['stylus']);
	grunt.registerTask('views', ['jade']);
}

grunt.registerTask('default', ['scripts','styles','views']);
```

Run command

```
grunt --env=prod
grunt --env=test
```

## Automatically run task when file changed

```
npm install --save-dev grunt-contrib-watch grunt-contrib-concat

module.exports = function(grunt) {
	grunt.initConfig({
		srcFiles: ["src/a.js", "src/b.js", "src/c.js"],
		concat: {
			target1: {
				files: {
					"build/abc.js": "<%= srcFiles %>"
				}
			}
		},
		watch: {
			target1: {
				files: "<%= srcFiles %>",
				tasks: ["concat"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat', 'watch']);	
}
```

## Automating browser refreshes on file changes with LiveReload

Enabling Live Reload: [https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html](https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html)

[https://github.com/gruntjs/grunt-contrib-watch#optionslivereload](https://github.com/gruntjs/grunt-contrib-watch#optionslivereload)


## Include external task

`grunt.loadTasks` function accept a directory path as the argument, then runs every JavaScript file inside the given directory as if it were a "mini" `Gruntfile.js` file (also passing it the current grunt object). 

```
// Gruntfile.js
module.exports = function(grunt) {
	grunt.initConfig({
		foo: {
			bar: 42
		}
	});
	grunt.loadTasks("./tasks");
	grunt.registerTask("default", ["foo"]);
};

// tasks/foo.js
module.exports = function(grunt) {
	grunt.registerTask("foo", function() {
		console.log("foo says bar is: " + grunt.config("foo.bar"));
	});
}
```

## Wrapping JavaScript code within immediately invoked function expressions (IIFEs)

```
// npm install --save-dev grunt-iife
module.exports = function(grunt) {
	grunt.initConfig({
		iife: {
			myTarget: {
				options: {
					useStrict: false,
					prependSemicolon: false,
				},
				files:  [{
					expand: true,
					cwd: 'app',
					src: '**/*.js',
					dest: 'build/',
					filter: function(filepath) {
						// exclude files in bower_components folder
						return filepath.indexOf('bower_com')===-1;
					}
				}]
			}
		},
	});

	grunt.loadNpmTasks('grunt-iife');
	grunt.registerTask('default', 'wrap code with IIFE', ['iife']);
};
```

## Add AngularJS dependency injection annotations
```
module.exports = function(grunt) {
	grunt.initConfig({
		ngAnnotate: {
			options: {
				singleQuotes: true,
			},
			build: {
				files: [
					{
						expand: true,
						cwd: 'app',
						src: '**/*.js',
						dest: 'build/',
						filter: function(filepath) {
							// exclude files in bower_components folder
							return filepath.indexOf('bower_com')===-1;
						}
					},
				],
			},
		},
	});
	 
	grunt.loadNpmTasks('grunt-ng-annotate');
	
	grunt.registerTask('default', 'Build files for frontend',
		['ngAnnotate']);
}
```

## Check unclosed tags
```
module.exports = function(grunt) {
	grunt.initConfig({
		htmlhint: {
			abc: {
				options: {
					'tag-pair': true,
					'tag-self-close': true,
					'attr-value-not-empty': true,
				},
				files: [
					{
						expand: true,
						cwd: 'app',
						src: '**/*.html',
						dest: 'build/',
						filter: function(filepath) {
							// exclude files in bower_components folder
							return filepath.indexOf('bower_com')===-1;
						}
					},
				],				
			},
		}
	});
	 
	grunt.loadNpmTasks('grunt-htmlhint');
	
	grunt.registerTask('default', 'Build files for frontend',
		['htmlhint']);
}
```


## A test task to dump file list
```
	grunt.registerMultiTask('test', 'Dump files', function() {
		this.files.forEach(function(file) {
			console.log(file.src, file.dest);
			file.src.forEach(function(filename) {
				console.log(filename);
			});
		});
	});

```