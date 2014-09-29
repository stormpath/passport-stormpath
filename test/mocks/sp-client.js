var MockSpApp = require('./sp-app');

function MockSpClient(){

}

MockSpClient.prototype.getApplication = function(appHref,cb) {
    cb(null,new MockSpApp());
};


MockSpClient.prototype.getAccount = function(/* userHref,[options],cb */) {
    var args = Array.prototype.slice.call(arguments);
    var href = args.shift();
    var cb = args.pop();
    cb(null,{href:href});
};

module.exports = MockSpClient;