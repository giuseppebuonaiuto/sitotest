module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9000,
                    open: true,
                    base: 'dist'
                }
            }
        },
        watch: {
            jade: {
                files: ['dev/*.jade'],
                tasks: ['jade'],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['dist/**/*'],
            },
        },
        clean: {
            folder: "dist/"
        },
        bower: {
            install: {
                options: {
                    targetDir: './dev',
                    layout: 'byType',
                    verbose: false,
                    bowerOptions: {}
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: false,
                    src: ['dev/js/jquery/jquery.min.js'],
                    dest: 'dist/js/jquery/jquery.min.js',
                    filter: 'isFile'
                }]
            }
        },
        jade: {
            pretty: {
                files: {
                    'dist/index.html': ['dev/index.jade']
                },
                options: {
                    pretty: true
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/js/app/app.min.js': 'dev/js/app/app.js'
                }
            },
            options: {
                'beautify': true,
                'preserveComments': 'all'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/layout/layout.min.css': 'dev/scss/layout/layout.scss',
                    'dist/css/media-queries/media-queries.min.css': 'dev/scss/media-queries/media-queries.scss'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {}
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dev/imgs/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/imgs/'
                }]
            }
        },
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['bower', 'copy', 'jade', 'uglify', 'sass', 'cssmin', 'imagemin']);
    grunt.registerTask('build', ['clean', 'bower', 'copy', 'jade', 'uglify', 'sass', 'cssmin', 'imagemin']);
    grunt.registerTask('serve', ['connect', 'clean', 'bower', 'copy', 'jade', 'uglify', 'sass', 'watch', 'cssmin', 'imagemin']);
};