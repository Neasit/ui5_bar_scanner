/*
    Base grunt script for build and deploy SAP UI5 Application
    version: 3.0
    1.1 - added ESLint, Server.js
    1.2 - added babel task and manage versions
    2.0 - move tools to npm package (grunt-tdevopsui5)
    2.1 - added task for MTA - GNU Make is required
    3.0 - go to UI5 Tooling
    author: Neasit
*/
const dotenv = require('dotenv');

module.exports = function(grunt) {
  const oPkg = grunt.file.readJSON('package.json');

  const envResult = dotenv.config();

  if (envResult.error) {
    throw envResult.error;
  }
  /*
    ABAP_DEVELOPMENT_SERVER_HOST
    ABAP_DEVELOPMENT_CLIENT
    ABAP_DEVELOPMENT_USER
    ABAP_DEVELOPMENT_PASSWORD
    ABAP_PACKAGE
    ABAP_APPLICATION_NAME
    ABAP_APPLICATION_DESC
    ABAP_DEVELOPMENT_TRANSPORT
    ABAP_DEVELOPMENT_LANGU
    UI5_RESOURCES_PATH
  */
  const dirs = {
    src: 'webapp', // webapp - for app; src - for libs
    dest: 'dist',
    temp: 'temp',
    resourceDir: envResult.parsed.UI5_RESOURCES_PATH,
  };

  grunt.initConfig({
    pkg: oPkg,
    conf: envResult.parsed,

    dir: dirs,

    run: {
      options: {},
      mta_build: {
        exec: 'npm run mtabuild',
      },
      build: {
        exec: 'npm run build',
      },
      server: {
        exec: 'npm run start',
      },
    },

    nwabap_ui5uploader: {
      options: {
        // abap options
        conn: {
          // server info
          server: '<%= conf.ABAP_DEVELOPMENT_SERVER_HOST %>',
          client: '<%= conf.ABAP_DEVELOPMENT_CLIENT %>',
          useStrictSSL: false,
        },
        // credentional
        auth: {
          user: '<%= conf.ABAP_DEVELOPMENT_USER %>',
          pwd: '<%= conf.ABAP_DEVELOPMENT_PASSWORD %>',
        },
      },
      upload_build: {
        options: {
          ui5: {
            package: '<%= conf.ABAP_PACKAGE %>',
            bspcontainer: '<%= conf.ABAP_APPLICATION_NAME %>',
            bspcontainer_text: '<%= conf.ABAP_APPLICATION_DESC %>',
            transportno: '<%= conf.ABAP_DEVELOPMENT_TRANSPORT %>',
            calc_appindex: true,
            language: '<%= conf.ABAP_DEVELOPMENT_LANGU || "EN" %>',
          },
          resources: {
            cwd: '<%= dir.dest %>',
            src: '**/*.*',
          },
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-nwabap-ui5uploader');

  grunt.loadNpmTasks('grunt-run');
  // default task
  grunt.registerTask('default', ['run:build']);

  grunt.registerTask('mta', ['run:build', 'run:mta_build']);

  grunt.registerTask('server', ['run:server']);

  grunt.registerTask('deploy', ['nwabap_ui5uploader:upload_build']);
};
