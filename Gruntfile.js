module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify: {
            serve: {
                options: {
                    message: 'Server is ready!'
                }
            },
            dist: {
                options: {
                    message: 'FTP version is ready in dist/ folder!'
                }
            }
        },
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
                    style: 'nested'
                },
                files: {
                    'dist/css/layout/layout.css': 'dev/scss/layout/layout.scss',
                    'dist/css/media-queries/media-queries.css': 'dev/scss/media-queries/media-queries.scss'
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
        postcss: {
            options: {
                map: true,

                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            },
            dist: {
                src: 'dist/css/**/*.css'
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
        pagespeed: {
            options: {
                nokey: true,
                url: "https://developers.google.com"
            },
            paths: {
                options: {
                    paths: ["/page_speed"],
                    locale: "it_IT",
                    strategy: "desktop",
                    threshold: 80
                }
            }
        },
        uncss: {
            dist: {
                files: [{
                    src: 'dist/*.html',
                    dest: 'dist/css/compiled.min.css'
                }]
            },
            options: {
                compress: true
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['dist/index.html']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', [
        'bower',
        'copy',
        'jade',
        'uglify',
        'sass',
        'cssmin',
        'postcss',
        'imagemin',
        'uncss',
        'processhtml'
    ]);
    grunt.registerTask('dist', [
        'clean',
        'bower',
        'copy',
        'jade',
        'uglify',
        'sass',
        'cssmin',
        'postcss',
        'imagemin',
        'uncss',
        'processhtml',
        'pagespeed',
        'notify:dist'
    ]);
    grunt.registerTask('serve', [
        'connect',
        'clean',
        'bower',
        'copy',
        'jade',
        'uglify',
        'sass',
        'cssmin',
        'postcss',
        'imagemin',
        'uncss',
        'processhtml',
        'notify:serve',
        'watch'
    ]);
};