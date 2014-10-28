.. _changelog:


Change Log
==========

All library changes, in descending order.


Version 0.2.3
-------------

**Released on October 28, 2014.**

- Updating README.
- Adding new Sphinx documentation.


Version 0.2.2
-------------

**Released on September 27, 2014.**

- Fixing an issue where the `expansions` option was not used by
  `deserializeUser`, thanks @doublerebel!


Version 0.2.1
-------------

**Released on September 22, 2014.**

- Upgrading the stormpath dependency to `0.6.0`.

Version 0.2.0
-------------

**Released on September 19, 2014.**

- After authentication the value of `req.user` will now be an `Account` object
  from the Stormpath Node SDK.  Previously it was an object literal.
- Added an `expansions` option to the strategy constructor, allowing you to
  expand resources on the account during login.
