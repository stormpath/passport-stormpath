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

    if(!opts.spApp){
        throw new Error('spApp not provided');
    }
    this._usernameField = opts.usernameField || 'username';
    this._passwordField = opts.passwordField || 'password';

    var self = this;
    self.spApp = o.spApp;
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
    self.spApp.authenticateAccount(data, function onAuthcResult(err, result) {
        if (err) {
            return self.fail({message:err.userMessage},400);
        }else{
            self.success(result.account);
        }
    });
};

module.exports = Strategy;