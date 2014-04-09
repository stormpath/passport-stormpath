var assert = require('chai').assert;
var expect = require('chai').expect;
var lib = require('../lib');


describe('test framework', function(){
  it('should assert true', function(){
    assert.equal(true,true);
  });
});

describe('lib entry', function(){
  it('should export an function', function(){
    assert.equal(typeof lib,"function");
  });
  it('should export a constructor', function(){
    assert.equal(typeof lib.Strategy,"function");
  });
  it('export and constructor are same thing', function(){
    assert.equal(lib,lib.Strategy);
  });
});

describe('Strategy instance', function(){
    it('should throw without apiKeyFilePath',function(){
        expect(function(){return new lib({appHref:"x"});}).throws(/^apiKeyFilePath not provided$/);
    });
    it('should throw without appHref',function(){
        expect(function(){return new lib({apiKeyFilePath:"x"});}).throws(/^appHref not provided$/);
    });
    it('should have an authenticate method',function(){
        var instance = new lib({apiKeyFilePath:"x",appHref:"x"});
        assert.equal(typeof instance.authenticate, "function");
    });
    it('should have a name property',function(){
        var instance = new lib({apiKeyFilePath:"x",appHref:"x"});
        assert.equal(instance.name, "stormpath");
    });
});

// TODO
// no username and password
// bad username and password
// user is found