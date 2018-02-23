const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const http = require('http');

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);

describe('run route tests', function(){

    after(function() {
        process.exit(1);
    });

    describe('Should display the editor page.', function() {
        it('/index', function(done) {
            http.get('http://localhost:3000/doc/teste', function(res) {
                assert.equal(res.statusCode, 200);

                let body = '';
                res.on('data', function(d) {
                    body += d;
                });

                res.on('end', function() {
                    assert.match(body, /<textarea .*>.*<\/textarea>/, 'Textarea not found. page not loading correctly');
                    done();
                })
            });
        });
    });

    describe('Should display a loaded document.', function() {
        it('/doc/teste', function(done) {
            http.get('http://localhost:3000/doc/teste', function(res) {
                assert.equal(res.statusCode, 200);

                let body = '';
                res.on('data', function(d) {
                    body += d;
                });

                res.on('end', function() {
                    assert.match(body, /<textarea .*>Hello World!<\/textarea>/, 'Textarea not found. page not loading correctly');
                    done();
                })
            });
        });
    });

    describe('Download route.', function() {
        it('/page/download', function(done) {
            chai.request(app).post('/page/download').send({isTest: true}).end(function(err, res){
                expect(res).to.have.status(200);
                done();
            })
        })
    });

    describe('Download page route.', function() {
        it('/page/download/teste', function(done) {
            chai.request(app).get('/page/download/teste').send({isTest: true}).end(function(err, res){
                expect(res).to.have.status(200);
                done();
            })
        })
    });


    describe('runt route to save route', function() {
        it('/save', function(done) {
            chai.request(app).post('/ping').end(function(err, res){
                expect(res).to.have.status(200);
                done();
            })
        });
    });
})