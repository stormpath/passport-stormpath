
# passport-stormpath Changelog

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

