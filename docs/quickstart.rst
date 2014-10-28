.. _quickstart:


Quickstart
==========

Now that we've got all the prerequisites out of the way, let's take a look at
some code!  Integrating passport-stormpath into an application is pretty quick!


Initialize passport-stormpath
-----------------------------

To initialize passport-stormpath, you need to use the initialize the strategy as
well as set some environment variables.

Before continuing, you'll need to set some environment variables which contain
your Stormpath credentials (*these credentials can be found inside of the
``apiKey.properties`` file you downloaded previously*)::

    $ export STORMPATH_API_KEY_ID=xxx
    $ export STORMPATH_API_KEY_SECRET=xxx
    $ export STORMPATH_APP_HREF=xxx

.. note::
    If you're using Windows, you'll need to set these environment variables in a
    different way.  This article should help:
    http://www.computerhope.com/issues/ch000549.htm

The ``STORMPATH_APP_HREF`` variable needs to be your Stormpath Application's
URL.  To get this, visit your `Stormpath Application Dashboard`_, click your
application, then copy the URL.

Once you've set your environment variables, you can then properly initialize the
Stormpath Passport strategy like so::

    var passport = require('passport');
    var StormpathStrategy = require('passport-stormpath');

    var strategy = new StormpathStrategy();

    passport.use(strategy);
    passport.serializeUser(strategy.serializeuser);
    passport.deserializeUser(strategy.deserializeUser);

    // Your application logic here.

That's it!

You've now fully initialized the Stormpath Passport strategy, and can continue
building your Passport-based application.

For more information on building applications with Passport, please read through
the official `Passport Guide`_.


.. _Stormpath applications: https://api.stormpath.com/v#!applications
.. _Stormpath Application Dashboard: https://api.stormpath.com/v#!applications
.. _Stormpath dashboard: https://api.stormpath.com/ui/dashboard
.. _Passport Guide: http://passportjs.org/guide/
