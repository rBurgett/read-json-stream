/* global describe, it */
/* eslint no-unused-vars:0 */

import path from 'path';
import should from 'should';
import ReadJSONStream from '../src/read-json-stream';

describe('ReadJSONStream', function() {

    this.timeout(10000);

    const filePath = path.join('test', 'test.json');

    it('should be a function', () => {
        ReadJSONStream.should.be.a.Function();
    });
    it('should throw an error if no file path passed in', () => {
        (() => ReadJSONStream)().should.throw();
    });
    it('should return an object', () => {
        // console.log(ReadJSONStream(filePath));
        ReadJSONStream(filePath).should.be.an.Object();
    });

    describe('the object', () => {
        it('should have a progress method', () => {
            ReadJSONStream(filePath).progress.should.be.a.Function();
        });
        it('should have a done method', () => {
            ReadJSONStream(filePath).done.should.be.a.Function();
        });
    });

    describe('the progress method', () => {
        it('should register a callback which is run on streaming progress', done => {

            let wasRun = false;

            ReadJSONStream(filePath)
                .progress(p => {
                    if(p) {
                        wasRun = true;
                    }
                })
                .done(() => {});

            setTimeout(() => {
                if(wasRun) {
                    done();
                }
            }, 200);
        });
    });

    describe('the done method', () => {
        it('should begin the streaming process & register a callback which is run when the streaming is finished', (done) => {
            ReadJSONStream(filePath)
                .done(() => {
                    done();
                });
        });
        it('should pass any error out as the first parameter of the callback', (done) =>{
            ReadJSONStream('badpath')
                .done((e) => {
                    if(e) {
                        done();
                    }
                });
        });
        it('should pass in the parsed data as the second parameter of the callback', (done) => {
            ReadJSONStream(filePath)
                .done((e, data) => {
                    if(data) {
                        done();
                    }
                });
        });
    });

});
