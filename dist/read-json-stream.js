'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oboe = require('oboe');

var _oboe2 = _interopRequireDefault(_oboe);

var _progressStream = require('progress-stream');

var _progressStream2 = _interopRequireDefault(_progressStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadJSONStream = function ReadJSONStream(origFilePath) {

    if (!origFilePath) {
        throw new Error('You must pass in a file path string');
    }

    var filePath = _path2.default.normalize(origFilePath);

    var onProgress = undefined;

    var start = function start() {
        return new Promise(function (resolve, reject) {

            var stat = undefined;
            try {
                stat = _fs2.default.statSync(filePath);
            } catch (e) {
                reject(e);
            }

            var stream = undefined;

            if (onProgress) {
                var prog = (0, _progressStream2.default)({
                    length: stat.size,
                    time: 100
                }).on('progress', function (p) {
                    onProgress(p.percentage.toFixed());
                });

                stream = _fs2.default.createReadStream(filePath).pipe(prog);
            } else {
                stream = _fs2.default.createReadStream(filePath);
            }

            (0, _oboe2.default)(stream).on('done', function (d) {
                setTimeout(function () {
                    resolve(d);
                }, 0);
            }).on('fail', function (e) {
                reject(e);
            });
        });
    };

    return {
        progress: function progress(callback) {
            if (!callback) {
                console.error('You must pass in a callback function to the progress method.');
            } else {
                onProgress = callback;
            }
            return this;
        },
        done: function done(callback) {
            if (!callback) {
                console.error('You must pass in a callback function to the done method.');
                return;
            }

            start().then(function (res) {
                callback(null, res);
            }, function (err) {
                callback(err);
            });
        }
    };
};

exports.default = ReadJSONStream;
