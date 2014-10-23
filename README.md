# Stormpath Passport Strategy

[![NPM Version](https://img.shields.io/npm/v/passport-stormpath.svg?style=flat)](https://npmjs.org/package/passport-stormpath)
[![NPM Downloads](http://img.shields.io/npm/dm/passport-stormpath.svg?style=flat)](https://npmjs.org/package/passport-stormpath)
[![Build Status](https://img.shields.io/travis/stormpath/passport-stormpath.svg?style=flat)](https://travis-ci.org/stormpath/passport-stormpath)

*A passport strategy for Stormpath, the simple user management API.*


## About

[Stormpath](https://stormpath.com/) is a User Management API that reduces development time with instant-on, scalable user infrastructure. Stormpath's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

This is an authentication strategy for use with the [Passport](http://passportjs.org/) middleware.  Use it in your application to authenticate Stormpath accounts via username and password.

Want to use this with Express?  Check out the [Stormpath Passport Express Sample](https://github.com/stormpath/stormpath-passport-express-sample)

## Links
+ [Node.js Quickstart & API Documentation](http://docs.stormpath.com/nodejs/api/home#quickstart) - Get started with Stormpath in an hour!
+ [Stormpath's site](http://stormpath.com/)
+ [Stormpath Support](https://support.stormpath.com/home)

## Build Instructions

To use this module in your Node.js application:

```
npm install passport-stormpath
```

## Usage

If you have exported your API and App information to the environment as `STORMPATH_API_KEY_ID`, `STORMPATH_API_KEY_SECRET`, `STORMPATH_APP_HREF`, then you may simply do this:

```javascript
var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');
var strategy = new StormpathStrategy();

passport.use(strategy);
passport.serializeUser(strategy.serializeUser);
passport.deserializeUser(strategy.deserializeUser);
```

**Security tip**:  we recommend storing your API credentials in a keyfile, please see the [ApiKey documentation](http://docs.stormpath.com/nodejs/api/apiKey) for instructions.

## Changelog

### 0.2.2

Fix issue where `expansions` option was not used by `deserializeUser`, thanks @doublerebel (#11)

### 0.2.1

Upgrade the Stormpath Node SDK Dependency to 0.6.0

### 0.2.0

* After authentication the value of `req.user` will now be an `Account` object from the Stormpath Node SDK.
Previously it was an object literal.
* Added an `expansions` option to the strategy constructor, allowing you to expand
resources on the account during login.  See below for example usage.

## Options

You can manually pass in your API keys and App Href as string properties:

```javascript
var strategy = new StormpathStrategy({
    apiKeyId: "STORMPATH_API_KEY_ID",
    apiKeySecret: 'STORMPATH_API_KEY_SECRET',
    appHref: "STORMPATH_APP_HREF"
});
```

You can also provide your own Stormpath client instance by constructing
it manually and then passing it and an application reference to the
strategy constructor:

```javascript

var stormpath = require('stormpath');

var spClient, spApp, strategy;

spClient = new stormpath.Client({
    apiKey: new stormpath.ApiKey(
        process.env['STORMPATH_API_KEY_ID'],
        process.env['STORMPATH_API_KEY_SECRET']
    )
});

spClient.getApplication(process.env['STORMPATH_APP_HREF'],
    function(err,app){
        if(err){
            throw err;
        }
        spApp = app;
        strategy = new StormpathStrategy({
            spApp: spApp,
            spClient: spClient
        });
        passport.use(strategy);
    }
);

```

Account resources (e.g. Custom Data, Groups) can be expanded during the authentication process.
Declare which resources you would like to expand by providing a comma seperated list
as the `expansions` option:

```javascript
var strategy = new StormpathStrategy({
    expansions: 'groups,customData'
});
```


## Contributing

You can make your own contributions by forking the <code>development</code> branch, making your changes, and issuing pull-requests on the <code>development</code> branch.

We regularly maintain our GitHub repository, and are quick about reviewing pull requests and accepting changes!

## Copyright

Copyright &copy; 2014 Stormpath, Inc. and contributors.

This project is open-source via the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).
