module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		cssmin: {
			dist: {
				src: 'public/stylesheets/style.css',
				dest: 'public/stylesheets/style.min.css',
			}
		},
		bowercopy: {
			dist: {
				options: {
					destPrefix: 'public/vendor'
				},
				files: {
					'bootstrap/': 'bootstrap/',
					'jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
					'd3/d3.min.js': 'd3/d3.min.js',
					'AdminLTE/AdminLTE.min.css': 'AdminLTE/dist/css/AdminLTE.min.css',
					'AdminLTE/': 'AdminLTE/dist/js/',
					'font-awesome/': 'font-awesome/'
				}
			}
		},
		watch: {
		  scripts: {
		    files: ['public/stylesheets/style.css'],
		    tasks: ['cssmin'],
		    options: {
		      spawn: false, //faster, but prone to errors
		      debounceDelay: 250 //delay for automated tasks
		    },
		  },
		  livereload: {
		    options: { livereload: true },
		    files: ['public/**/*', 'views/**/*']
		  }
		}
	
	});
	
	grunt.registerTask('default', ['cssmin', 'bowercopy', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-bowercopy');
};