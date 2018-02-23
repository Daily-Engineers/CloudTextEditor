const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const http = require('http');
const saveFile = require('../modules/saveFile');
const deleteFile = require('../modules/deleteFile');

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);

    describe('/index', function() {
        it('Should display the editor page.', function(done) {
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

    describe('/doc/teste', function() {
        it('Should display a loaded document.', function(done) {
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

    describe('/page/download', function() {
        it('Should test to see if the routing to download works', function(done) {
            chai.request(app).post('/page/download').send({isTest: true}).end(function(err, res){
                expect(res).to.have.status(200);
                done();
            })
        })
    });

    describe('/page/download/teste', function() {
        it('Should test to see if the routing to download a page works', function(done) {
            chai.request(app).get('/page/download/teste').send({isTest: true}).end(function(err, res){
                expect(res).to.have.status(200);
                done();
            })
        })
    });


    describe('/save', function() {
        it('Should test to see if the routing to save works', function(done) {
            chai.request(app).post('/ping').end(function(err, res){
                expect(res).to.have.status(200);
                done();
            })
        });
    });
