const assert = require('chai').assert;
const app = require('../app.js');
const http = require('http');

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
