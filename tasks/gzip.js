/*
 * grunt-gzip
 * https://github.com/zhangmhaao/gzip
 *
 * Copyright (c) 2015 zhangmh
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    var fs = require('fs');
    var TASK_NAME = 'gzip';
    var DESCRIPTION = 'calculate gzip size';
    var zlib = require('zlib');
    var path = require('path');
    var prettyBytes = require('pretty-bytes');
    var gzDirPath = path.resolve('./gzTmp');
    var mkdirp = require('mkdirp');
    var chalk = require('chalk');

    function gzip(filePath, tmpGzDirPath, callback) {
        //var gzipCompress = zlib.createGzip();
        filePath = path.resolve(filePath);
        /*console.log('process file ' + filePath);
        var gzFilePath = path.resolve(tmpGzDirPath, fileName + '.gz');
        console.log('##' + gzFilePath);
        var inputStream = fs.createReadStream(filePath);
        var outStream = fs.createWriteStream(gzFilePath);
        inputStream.pipe(gzipCompress).pipe(outStream);
        outStream.on('finish', function () {
            callback();
        });*/

        var buffer = fs.readFileSync(filePath);
        var gzipBuffer = zlib.gzipSync(buffer);
        var originSize = buffer.length;
        var gzipSize = gzipBuffer.length;
        callback({
            originSize: originSize,
            gzipSize: gzipSize
        });
    }

    function process(target, options, callback) {
        var config = options.config;
        var src = grunt.file.expand(options.src);
        var tmpGzDirPath = gzDirPath + "/" + target;
        var originTotal = 0;
        var gzipTotal = 0;
        src.forEach(function (file ) {
            //var stats = fs.statSync(file);
            gzip(file, tmpGzDirPath, function (result) {
                if (config.detail) {
              //      var fileName = path.basename(file);
                    grunt.log.writeln(
                        'file: ' +  chalk.cyan(file) +
                        '  -> origin: ' + chalk.yellow(prettyBytes(result.originSize)) +
                        ', gzip: ' + chalk.yellow(prettyBytes(result.gzipSize)) +
                        ', diff: ' + chalk.yellow(prettyBytes(result.originSize - result.gzipSize))
                    );
                }
                originTotal += result.originSize;
                gzipTotal += result.gzipSize;
            });
        });
        var diff = originTotal - gzipTotal;
        grunt.log.ok(chalk.green(target) + ': origin: ' + chalk.yellow(prettyBytes(originTotal)) + ', gzip: ' + chalk.yellow(prettyBytes(gzipTotal)) + ', saved: ' + chalk.yellow(prettyBytes(diff)) );
        callback();
    }


    grunt.registerMultiTask(TASK_NAME, DESCRIPTION, function () {

        var done = this.async(),
            config = grunt.config(TASK_NAME).options,
            options = Object.create(this.data, {
                config: {
                    value: config
                }
            });
        process(this.target, options, done);
    });
};