module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    projectfolder: '<%= pkg.name %>',
    buildfolder: '_BUILD/',
    status: '<%= projectfolder %>',

    // Task configuration
    clean: {
      build: {
        src: ["_BUILD/"]
      },
      verify: {
        options: {force: true},
        src: ["/Volumes/cevdev/home/wwwroot/verify/*"]
      },
      dist: {
        src: ["dist"]
      }
    },
    copy: {
      options: {
      },
      project: {
        files: [
          {
            expand: true,
            cwd: './',
            src: ['*', 'img/**', '!node_modules/**', '!*.json', '!*.js', '!less/**', '!_BUILD/**', '!*.psd', '!README.md', '!dist/**', '!fonts/**', '!ranchero/**', '!wordpress/**'],
            dest: '<%= buildfolder %>'
          }
        ]
      },
      verify: {
        files: [
          {
            expand: true,
            cwd: './_BUILD/',
            src: ['./**'],
            dest: '/Volumes/cevdev/home/wwwroot/verify'
          }
        ]
      },
      packagefile: {
        src: ['/Volumes/cevdev/template/package.json'],
        dest: './package.json'
      }
    },
    cssmin: {
      compress: {
        files: {
          '<%= buildfolder %>/css/main.css': ['css/*.css', '!css/main.css', 'css/main.css']
        }
      }
    },
    replace: {
      project: {
        src: ['<%= buildfolder %>/*.html', '<%= buildfolder %>/css/*.css', '<%= buildfolder %>/js/*.js'],
        overwrite: true,
        replacements: [{
          from: '©',
          to: '&copy;'
        },
        {
          from: '™',
          to: '&trade;'
        },
        {
          from: '®',
          to: '&reg;'
        },
        {
          from: '—',
          to: '&mdash;'
        },
        {
          from: '”',
          to: '&rdquo;'
        },
        {
          from: '“',
          to: '&ldquo;'
        },
        {
          from: '’',
          to: '&rsquo;'
        },
        {
          from: '‘',
          to: '&lsquo;'
        }]
      },
      packagefile: {
        src: ['./package.json'],
        overwrite: true,
        replacements: [{
          from: 'template',
          to: "<%= projectfolder %>"
        }]
      }
    },
    htmlmin: {
      project: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= buildfolder %>/index.html': '<%= buildfolder %>/index.html'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          '<%= buildfolder %>/js/main.js': ['js/plugins/*.js', 'js/main.js']
        }
      }
    },
    htmlrefs: {
      output: {
        src: '<%= buildfolder %>/index.html',
        dest: '<%= buildfolder %>'
      },
    },
    csslint: {
      options: {
        csslintrc: '/Volumes/cevdev/.csslintrc'
      },
      strict: {
        src: ['./css/*.css']
      }
    },
    less: {
      dev: {
        files: {
          "./css/main.css": "./less/main.less"
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 10', 'ie 9', 'ie 8', 'safari > 5', 'ios > 5']
      },
      css: {
        files: {
          'css/main.css': 'css/main.css'
        }
      }
    },
    shell: {
      options: {
        stdout: true
      },
      build: {
          command: [
            'echo The info is copied to your clipboard',
            'echo <%= status %> | pbcopy'
          ].join('&&')
      },
      packagefile: {
        command: 'npm install'
      },
      preview: {
        command: 'echo http://fatsamurai.asuscomm.com/Batcave/sites/?c=<%= projectfolder %>/index.html | pbcopy'
      },
      //grunt clean wasn't fully cleaning NM folders on Cevin's machine. So this bash command does that and makes the symlink to the nm folder. 
      symlinkModules: {
        command: 'if [ -L "./node_modules" ]; then echo A node_modules symlink already exists; else rm -rf node_modules; rm -rf node_modules; ln -sv /Volumes/cevdev/template/node_modules/ ./node_modules; fi'
      },
    },
    open : {
      verify : {
        path: 'http://home.dev/verify/index.html',
        app: 'Google Chrome'
      },
      preview: {
        path: 'http://fatsamurai.asuscomm.com/Batcave/sites/?c=<%= projectfolder %>/index.html',
        app: 'Google Chrome'
      }
    },
    htmlhint: {
      html1: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'spec-char-escape': true,
          'id-unique': true,
          'img-alt-require': true,
          'style-disabled': true
        },
        src: ['./*.html']
      }
    },
    watch: {
      less: {
        files: ['less/project.less'],
        tasks: ['less', 'autoprefixer']
      },
      lint: {
        files: ['./*.html'],
        tasks: ['htmlhint']
      }
    },
    'ftp-deploy': {
      preview: {
        auth: {
          host: 'fatsamurai.asuscomm.com',
          authKey: 'admin',
          pass: 'Keyser81t'
                },
        src: './',
        dest: 'Batcave/sites/<%= projectfolder %>',
        exclusions: ['./**/.DS_Store', './.git/**', './node_modules/**', './node_modules/.bin/grunt-open', './_BUILD/**', 'Gruntfile.js', 'package.json', './dist/**']
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: './img/',
          src: ['*.{png,jpg,gif}'],
          dest: '<%= buildfolder %>/img/'
        }]
      }
    },
    browser_sync: {
      files: {
        src: [
          './css/main.css',
          './index.html',
          './js/main.js'
          ]
      },
      options: {
        watchTask: true,
        liveReload: true,
        server: {
          host: "192.168.1.21",
        }
      }, 
    },
  });

  //load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Default task(s)
  // Build when there is no js in the project
  grunt.registerTask('build', ['clean:build', 'copy:project', 'imagemin', 'cssmin', 'htmlrefs:output', 'replace:project', 'htmlmin:project', 'shell:build' ,'verify']);

  // Build when js is included
  grunt.registerTask('buildjs', ['clean:build', 'copy:project', 'imagemin', 'cssmin', 'htmlrefs:output', 'uglify', 'replace:project', 'htmlmin:project', 'shell:build', 'verify']);

  // Watch for building
  grunt.registerTask('dev', ['browser_sync', 'watch']);

  // Open output folder on verify domain for preview 
  grunt.registerTask('verify', ['clean:verify', 'copy:verify', 'open:verify']);

  //creats a symlink for mobile local development / testing
  grunt.registerTask('mobile', ['shell:mobile']);

  // Check the CSS
  grunt.registerTask('lint', ['htmlhint', 'csslint']);

  // Update package.json in the project folder & install missing node modules
  grunt.registerTask('updatenm', ['copy:packagefile', 'replace:packagefile', 'shell:packagefile']);

  // Update package.json in the project folder & deletes node modules folder and replaces with symlink
  grunt.registerTask('update', ['copy:packagefile', 'replace:packagefile', 'shell:symlinkModules']);

  //push the development version to the interactive server
  grunt.registerTask('preview', ['ftp-deploy', 'open:preview', 'shell:preview']);
};