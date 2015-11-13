 module.exports = function(grunt) {

	require('time-grunt')(grunt); // Need to require
	require('load-grunt-tasks')(grunt); // Load tasks automatically

	require('load-grunt-config')(grunt, {

	    data: { // Define global variables in here

  			paths: {

					base: 'sticky',

  				// JavaScript assets
  				js : {
              src : '<%= paths.base %>/sticky.js',
  				    dest : '<%= paths.base %>/sticky.min.js'
  				},

  				// CSS assets
  				css : {
              src : '<%= paths.base %>/sticky.scss',
              dest : '<%= paths.base %>/sticky.css',
              dest_min : '<%= paths.base %>/sticky.min.css'
  				},
  			},
	    }
	});
};
