const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app.js');
const http = require('http');

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);
//for more on how to use chai-http https://github.com/chaijs/chai-http

describe('Example request for chai get, It Should return pong.', function() {
    it('/ping', function(done) {
        chai.request(app).get('/ping').end(function(err, res){
            assert.equal(res.statusCode, 200);
            //or
            expect(res).to.have.status(200);
            done();
        })
    })
});

describe('Example request for chai post, It Should return pong.', function() {
    it('/ping', function(done) {
        chai.request(app).post('/ping').end(function(err, res){
            assert.equal(res.statusCode, 200);
            //or
            expect(res).to.have.status(200);
            done();
        })
    })
});

describe('HTTP Server test', function() {
  describe('/ping', function() {
    it('Should return pong.', function(done) {
      http.get('http://localhost:3000/ping', function(res) {

        assert.equal(res.statusCode, 200);
        let body = '';
        res.on('data', function(d) {
          body += d;
        });

        res.on('end', function() {
          assert.equal(body, 'pong');
          done();
        })
      });
    });
  });

  describe('/', function() {
    it('Should display the editor page.', function(done) {
      http.get('http://localhost:3000/', function(res) {
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
});

//EXAMPLE TESTS
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    })
  })
});

describe('#lt()', function() {
  it('Should return true when a < b', function() {
    assert.equal(true, lt(1, 20));
  })
});

describe('#lt()', function() {
  it('Should return false when a > b', function() {
    assert.equal(false, lt(100, 2));
  })
});

describe('#lt()', function() {
  it('Should return false when a = b', function() {
    assert.equal(false, lt(1, 1));
  })
});


function lt(a, b) {
  return a < b;
}
