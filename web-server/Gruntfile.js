/**
 * Created by moonrailgun on 2016-01-16.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: ['public/js/game/**/*.js'],
                dest: 'public/js/lib/<%= pkg.name %> - <%= pkg.version%>.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat']);
};