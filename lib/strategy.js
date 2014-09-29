var stormpath = require('stormpath');
var version = require('../package.json').version;
var passportVersion = require('passport/package.json').version;

function lookup(obj, field) {
    if (!obj) { return null; }
    var chain = field.split(']').join('').split('[');
    for (var i = 0, len = chain.length; i < len; i++) {
        var prop = obj[chain[i]];
        if (typeof(prop) === 'undefined') { return null; }
        if (typeof(prop) !== 'object') { return prop; }
        obj = prop;
    }
    return null;
}

function Strategy(o){
    var opts = o || {};

    this._usernameField = opts.usernameField || 'username';
    this._passwordField = opts.passwordField || 'password';

    var apiKeyId = opts.apiKeyId || process.env['STORMPATH_API_KEY_ID'] || "";
    var apiKeySecret = opts.apiKeySecret || process.env['STORMPATH_API_KEY_SECRET'] || "";
    var appHref = opts.appHref || process.env['STORMPATH_APP_HREF'] || "";

    var self = this;

    self.expansions = opts.expansions || null;

    if(opts.spClient){
        self.spClient = opts.spClient;
    }else{
        self.spClient = new stormpath.Client({
            apiKey: new stormpath.ApiKey(apiKeyId,apiKeySecret),
            userAgent: 'passport-stormpath/' + version + ' ' + 'passport/' + passportVersion,
        });
    }

    if(opts.spApp){
        self.spApp = opts.spApp;
    }else{
        self.spClient.getApplication(appHref,
            function(err,app){
                self.spApp = app;
                if(err){
                    throw err;
                }
            }
        );
    }
    self.serializeUser = function(user, done) {
        done(null, user.href);
    };

    self.deserializeUser = function(userHref, done) {
        var options = self.expansions ? { expand: self.expansions } : null;
        self.spClient.getAccount(userHref, options, function(err,account){
            done(err,account);
        });
    };
    return this;
}

Strategy.prototype.name = "stormpath";

Strategy.prototype.authenticate = function(req, options) {
    options = options || {};
    var self = this;
    var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
    var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
    var data = {username:username,password:password};

    if (!username || !password) {
        return self.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
    }
    self.spApp.authenticateAccount(data, function onAuthcResult(err, authenticationResult) {
        if (err) {
            return self.fail({message:err.userMessage},err.status || 500);
        }else{
            var options = self.expansions ? { expand: self.expansions } : null;
            authenticationResult.getAccount(options,function(err,account){
                if (err) {
                    return self.fail({message:err.userMessage},err.status || 500);
                }else{
                    return self.success(account);
                }
            });

        }
    });
};

module.exports = Strategy;
