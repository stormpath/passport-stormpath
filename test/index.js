var assert = require('chai').assert;

describe('test framework', function(){
  it('should assert true', function(){
    assert.equal(true,true);
  });
});

describe('lib entry', function(){
  it('should export an object', function(){
    assert.equal(typeof require('../lib'),"object");
  });
});