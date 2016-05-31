module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		cssmin: {
			my_target: {
				// files: [{	
				// 	expand: true,
				// 	cwd: 'public/stylesheets',
				// 	src: ['*.css', '!*.min.css'],
				// 	dest: 'public/stylesheets',
				// 	ext: '.min.css'
				// }]
				src: 'public/stylesheets/style.css',
				dest: 'public/stylesheets/style.min.css',
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
		}
	
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};