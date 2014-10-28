passport-stormpath
==================

passport-stormpath is a strategy for `Passport`_ that makes it *incredibly*
simple to add users and user data to your application.  It aims to completely
abstract away all user registration, login, authentication, and authorization
problems, and make building secure websites painless.  And the best part?
**You don't even need a database!**


.. note::
    If you're writing an Express.js web application, you should use our
    `Express-Stormpath`_ library, not this one!  This library should be used if
    you are building a web application using Passport.js and a non-Express.js
    web framework!


User's Guide
------------

This part of the documentation will show you how to get started with
passport-stormpath.  If you're a new passport-stormpath user, start here!

.. toctree::
   :maxdepth: 2

   about
   setup
   quickstart
   help


Additional Notes
----------------

This part of the documentation covers changes between versions and upgrade
information, to help you migrate to newer versions of passport-stormpath
easily.

passport-stormpath is made available under the `Apache License, Version 2.0`_.
In short, you can do pretty much whatever you want!

.. toctree::
   :maxdepth: 2

   changelog
   upgrading


.. _Passport: http://passportjs.org/
.. _Express-Stormpath: https://docs.stormpath.com/nodejs/express/
.. _Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0.html
