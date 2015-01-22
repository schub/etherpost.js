etherpost.js
============

etherpost.js is a nodejs app which fetches an etherpad and writes it to an existing to wordpress post using the XML-RPC-API.

So we can have multiple users editing an wordpress-post simultaniously and update it periodically.


usage
-----

Set your app properties in ```config/production.js``` (copy default.js).

after download run
```
    npm install
    export NODE_ENV=production
    node etherpost.js
```


why?
----

please see here: https://github.com/wetterfrosch/etherpost
