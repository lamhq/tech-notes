# Configuring

## Configuring files

### Single file set and multiple file set

Reference: [https://gruntjs.com/configuring-tasks#files](https://gruntjs.com/configuring-tasks#files)

```
module.exports = function(grunt) {
	grunt.initConfig({
		default: {
			// single file set
			target1: { src: '*.js', dest: 'dest/ab.js' },
			// multiple file set
			target2: {
				files: [
					{ src:'*.js', dest: 'build/abc.js' },
					{
						expand: true,
						cwd: '.',
						src: '*.json',
						dest: 'build/',
						ext: '.html'
					}
				]
			}
		}
	});

	grunt.registerMultiTask('default', function() {
		this.files.forEach(function(file) {
			console.log(file.dest, file.src);
		});
	});
};
```

### Globbing patterns

Reference: [https://gruntjs.com/configuring-tasks#globbing-patterns](https://gruntjs.com/configuring-tasks#globbing-patterns)

- `*` matches any number of characters, but not `/`
- `?` matches a single character, but not `/`
- `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
- `{}` allows for a comma-separated list of "or" expressions
- `!` at the beginning of a pattern will negate the match

All most people need to know is that `foo/*.js` will match all files ending with `.js` in the `foo/` subdirectory, but `foo/**/*.js` will match all files ending with .js in the `foo/` subdirectory and all of its subdirectories.

### Building the files object dynamically

[https://gruntjs.com/configuring-tasks#building-the-files-object-dynamically](https://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)


## Templates

```
grunt.initConfig({
	concat: {
		sample: {
			options: {
				banner: '/* <%= baz %> */\n',   // '/* abcde */\n'
			},
			src: ['<%= qux %>', 'baz/*.js'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
			dest: 'build/<%= baz %>.js',      // 'build/abcde.js'
		},
	},
	// Arbitrary properties used in task configuration templates.
	foo: 'c',
	bar: 'b<%= foo %>d', // 'bcd'
	baz: 'a<%= bar %>e', // 'abcde'
	qux: ['foo/*.js', 'bar/*.js'],
});
```

## Importing External Data

Grunt has `grunt.file.readJSON` and `grunt.file.readYAML` methods for importing JSON and YAML data.

```
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		dist: {
			src: 'src/<%= pkg.name %>.js',
			dest: 'dist/<%= pkg.name %>.min.js'
		}
	}
});
```
