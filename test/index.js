var assert = require('chai').assert;
var expect = require('chai').expect;
var lib = require('../lib');
var sinon = require('sinon');

var MockSpApp = require('./mocks/sp-app');

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
    it('should throw without spApp',function(){
        expect(function(){return new lib();}).throws(/^spApp not provided$/);
    });
    it('should have an authenticate method',function(){
        var instance = new lib({spApp:new MockSpApp()});
        assert.equal(typeof instance.authenticate, "function");
    });
    it('should call fail if an empty request body provided',function(){
        var instance = new lib({spApp:new MockSpApp()});
        var fail = sinon.spy();
        instance.fail = fail;
        expect(instance.authenticate.bind(instance,require('./mocks/req').empty)).to.not.throw();
        assert(fail.called,'fail was not called');
    });
    it('should call fail if a malformed request body provided',function(){
        var instance = new lib({spApp:new MockSpApp()});
        var fail = sinon.spy();
        instance.fail = fail;
        expect(instance.authenticate.bind(instance,require('./mocks/req').malformed)).to.not.throw();
        assert(fail.called,'fail was not called');
    });
    it('should call fail if body params are not strings',function(){
        var instance = new lib({spApp:new MockSpApp()});
        var fail = sinon.spy();
        instance.fail = fail;
        expect(instance.authenticate.bind(instance,require('./mocks/req').notStrings)).to.not.throw();
        assert(fail.called,'fail was not called');
    });
    it('should support custom fields',function(){
        var instance = new lib({spApp:new MockSpApp(),usernameField:"un",passwordField:"pw"});
        var success = sinon.spy();
        instance.success = success;
        expect(instance.authenticate.bind(instance,require('./mocks/req').custom)).to.not.throw();
        assert(success.called,'success was not called');
    });
    it('should call success if valid login is provieded',function(){
        var instance = new lib({spApp:new MockSpApp()});
        var success = sinon.spy();
        instance.success = success;
        expect(instance.authenticate.bind(instance,require('./mocks/req').good)).to.not.throw();
        assert(success.called,'success was not called');
    });
    it('should call fail and not success if invalid login is provieded',function(){
        var instance = new lib({spApp:new MockSpApp()});
        var fail = sinon.spy();
        var success = sinon.spy();
        instance.fail = fail;
        instance.success = success;
        expect(instance.authenticate.bind(instance,require('./mocks/req').bad)).to.not.throw();
        assert(fail.called,'fail was called');
        assert(!success.called,'success was called but shouldnt have been');
    });
    it('should have a name property',function(){
        var instance = new lib({spApp:new MockSpApp()});
        assert.equal(instance.name, "stormpath");
    });
});

// TODO
// no username and password
// bad username and password
// user is found