# Stormpath Passport Strategy #

[Stormpath](http://stormpath.com/) is a User Management API that reduces development time with instant-on, scalable user infrastructure. Stormpath's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

This is an authentication strategy for use with the [Passport](http://passportjs.org/) middleware.  Use it in your application to authenticate Stormpath accounts via username and password.

### Links
+ [Node.js Quickstart Guide](http://docs.stormpath.com/nodejs/api/home#quickstart) - Get started with Stormpath in an hour!
+ [Node.js Product Guide](http://docs.stormpath.com/nodejs/api/home) - In depth product documnetation for Stormpath's Node.js SDK
+ [Stormpath's site](http://stormpath.com/)
+ [Stormpath Support](https://support.stormpath.com/home)

### Build Instructions ###

To use this module in your Node.js application:

```
npm install passport-stormpath
```

### Express.js example

Want to use this with Express?  Check out the [Stormpath Express Sample](https://github.com/stormpath/stormpath-express-sample)


### General example

```javascript

var passport = require('passport');
var stormpath = require('stormpath');
var StormpathStrategy = require('passport-stormpath');

var spClient;

spClient = new stormpath.Client({
    apiKey: new stormpath.ApiKey(
        process.env['STORMPATH_API_KEY_ID'],
        process.env['STORMPATH_API_KEY_SECRET']
    )
});

spClient.getApplication(
    process.env['STORMPATH_APP_HREF'],
    function(err,app){
        if(err){
            throw err;
        }
        passport.use(new StormpathStrategy({spApp:app}));
    }
);

passport.serializeUser(function(user, done) {
    done(null, user.href);
});

passport.deserializeUser(function(userHref, done) {
    spClient.getAccount(userHref,function(err,account){
        done(err,account);
    });
});
```


### Contributing

You can make your own contributions by forking the <code>development</code> branch, making your changes, and issuing pull-requests on the <code>development</code> branch.

We regularly maintain our GitHub repostiory, and are quick about reviewing pull requests and accepting changes!

### Copyright ###

Copyright &copy; 2013 Stormpath, Inc. and contributors.

This project is open-source via the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).
