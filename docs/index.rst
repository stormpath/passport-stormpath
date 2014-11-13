passport-stormpath
==================

passport-stormpath is a strategy for `Passport`_ that makes it *incredibly*
simple to add users and user data to your application.  It aims to completely
abstract away all user registration, login, authentication, and authorization
problems, and make building secure websites painless.  And the best part?
**You don't even need a database!**


.. note::
    Passport.js is purely for authentication (i.e. checking that someone's 
    username and password is valid, or getting their identity from a social 
    provider). It is not designed for handling user registrations, manage 
    password resets, or implement email verification workflows, etc.  In turn, 
    our Passport integration only automates authentication.  

    To automate more than just authentication, check out our express-stormpath 
    library instead. It provides a full suite of user management features for 
    your Express-based web application:


    - Create, register and authenticate users.
    - Store custom user data with each account.
    - Create and assign permissions (groups, roles, etc.).
    - Handle complex authentication and authorization patterns, like multi-tenancy.
    - Log users in via social login with Facebook and Google OAuth.
    - Cache user information for quick access.
    - Secure all your passwords.
    - Automate all your password reset and account verification workflows.


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
