import fs from 'fs';
import path from 'path';
import oboe from 'oboe';
import progress from 'progress';

const ReadJSONStream = (origFilePath) => {

    if(!path) {
        console.error('You must pass in a file path string.');
        return;
    }

    const filePath = path.normalize(origFilePath);

    const start = () => {
        return new Promise((resolve, reject) => {

            let stat;
            try {
                stat = fs.statSync(filePath);
            } catch(e) {
                reject(e);
            }

            const prog = progress({
                length: stat.size,
                time: 100
            }).on('progress', progress => {
                if(this.onProgress) {
                    this.onProgress(progress.percentage.toFixed());
                }
            });

            var stream = fs.createReadStream(filePath).pipe(prog);

            oboe(stream)
                .on('done', function(d){
                    setTimeout(function() {
                        resolve(d);
                    }, 0);
                })
                .on('fail', function(e){
                    reject(e);
                });

        });

    };

    this.progress = (callback) => {

        if(!callback) {
            console.error('You must pass in a callback function to the progress method.');
        } else {
            this.onProgress = callback;
        }

        return this;

    };

    this.done = (callback) => {

        if(!callback) {
            console.error('You must pass in a callback function to the done method.');
            return;
        }

        start().then(
            res => {
                callback(null, res);
            },
            err => {
                callback(err);
            }
        );

    };

};

export default ReadJSONStream;
