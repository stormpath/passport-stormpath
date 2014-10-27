# passport-stormpath

[![NPM Version](https://img.shields.io/npm/v/passport-stormpath.svg?style=flat)](https://npmjs.org/package/passport-stormpath)
[![NPM Downloads](http://img.shields.io/npm/dm/passport-stormpath.svg?style=flat)](https://npmjs.org/package/passport-stormpath)
[![Build Status](https://img.shields.io/travis/stormpath/passport-stormpath.svg?style=flat)](https://travis-ci.org/stormpath/passport-stormpath)

*A passport strategy for Stormpath, the simple user management API.*


## About

A simple strategy for Passport.js that makes it incredibly simple to add users
and user data to your application. It aims to completely abstract away all user
registration, login, authentication, and authorization problems, and make
building secure websites painless. And the best part? You don't even need a
database!

[Stormpath](https://stormpath.com/) is a user management API that makes it easy to:

- Create user accounts.
- Edit user accounts.
- Store user data with each account.
- Create groups and roles.
- Assign users various permissions (groups, roles, etc.).
- Handle complex authentication and authorization patterns.
- Log users in via social login with Facebook and Google OAuth.
- Cache user information for quick access.
- Scale your application as you get more users.
- Securely store your users and user data in a central location.

**NOTE**: If you're building an Express.js web application, you might want to
use our [express-stormpath](https://docs.stormpath.com/nodejs/express/index.html)
library instead -- it provides a simpler integration experience.


## Installation

To get started, you need to install this package via
[npm](https://www.npmjs.org/package/passport-stormpath):

```console
$ npm install passport-stormpath
```


## Usage

To use this module, you first need to export some environment variables -- these
will be used by the `passport-stormpath` library to connect to the Stormpath API
service:

```console
$ export STORMPATH_API_KEY_ID=xxx
$ export STORMPATH_API_KEY_SECRET=xxx
$ export STORMPATH_APP_HREF=xxx
```

**NOTE**: These variables can be found in your
[Stormpath dashboard](https://api.stormpath.com/ui/dashboard).

Once you've set the environment variables above, you can then initialize the
`passport-stormpath` strategy like so:

```javascript
var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');
var strategy = new StormpathStrategy();

passport.use(strategy);
passport.serializeUser(strategy.serializeUser);
passport.deserializeUser(strategy.deserializeUser);
```


## Changelog

### 0.2.2

- Fix issue where `expansions` option was not used by `deserializeUser`, thanks
  @doublerebel (#11).

### 0.2.1

- Upgrade the Stormpath Node SDK Dependency to 0.6.0

### 0.2.0

- After authentication the value of `req.user` will now be an `Account` object
  from the Stormpath Node SDK.  Previously it was an object literal.
- Added an `expansions` option to the strategy constructor, allowing you to
  expand resources on the account during login.  See below for example usage.


## Options

If you'd like to explicitly define your Stormpath API keys and application href
settings, you can do so when creating the strategy object:

```javascript
var strategy = new StormpathStrategy({
  apiKeyId:     'STORMPATH_API_KEY_ID',
  apiKeySecret: 'STORMPATH_API_KEY_SECRET',
  appHref:      'STORMPATH_APP_HREF',
});
```

You can also provide your own Stormpath client instance by constructing it
manually and then passing it and an application reference to the strategy
constructor:

```javascript
var stormpath = require('stormpath');

var spClient, spApp, strategy;

spClient = new stormpath.Client({
  apiKey: new stormpath.ApiKey(
      process.env['STORMPATH_API_KEY_ID'],
      process.env['STORMPATH_API_KEY_SECRET']
  )
});

spClient.getApplication(process.env['STORMPATH_APP_HREF'], function(err, app) {
  if (err) {
    throw err;
  }
  spApp = app;
  strategy = new StormpathStrategy({
    spApp: spApp,
    spClient: spClient
  });
  passport.use(strategy);
});
```

Account resources (*e.g. Custom Data, Groups*) can be automatically expanded
during the authentication process.  Declare which resources you would like to
expand by providing a comma separated list as the `expansions` option:

```javascript
var strategy = new StormpathStrategy({
  expansions: 'groups,customData'
});
```


## Contributing

You can make your own contributions by forking the `develop` branch, making
your changes, and issuing pull-requests on the `develop` branch.

We regularly maintain our GitHub repository, and are quick about reviewing pull
requests and accepting changes!


## Copyright

Copyright &copy; 2014 Stormpath, Inc. and contributors.

This project is open-source via the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0).
