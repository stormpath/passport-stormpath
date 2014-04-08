// var stormpath = require('stormpath');

function Strategy(o){
    var opts = o || {};

    if(!opts.apiKeyFilePath){
        throw new Error('apiKeyFilePath not provided');
    }
    if(!opts.appHref){
        throw new Error('appHref not provided');
    }
}

Strategy.prototype.authenticate = function(req, opts) {
    return req+opts;
};

module.exports = Strategy;