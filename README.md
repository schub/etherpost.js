etherpost.js
============

etherpost.js is a nodejs app which fetches an etherpad and writes it to an existing wordpress post using wordpress XML-RPC api.

So we can have multiple users editing an wordpress-post simultaniously and update it periodically.


general
-------

This is about to edit a post, not to create one. Create a posting and set its categories & tags in adavance and grab the post id. Only the ```post_content``` field is updated.


usage
-----

* create a file ```config/production.js``` and adjust properties to your needs

```
    {
        "sourceUrl": "http://pads.ccc.de/ep/pad/export/oObqO9ICpL/latest?format=txt",
        "wordpress": {
            "url": "https://netzpolitik.org/xmlrpc.php",
            "username": "",
            "password": "",
            "postId": ""
        },
        "backup": {
            "dir": "~/tmp",
            "fileNamePrefix": "pad-backup_"
        },
        "interval": 5
    }
```

* install packages ```npm install```
* set node environment ```export NODE_ENV=production``` (this is relevant to ```config/*.json```)
* start app ```node etherpost.js```

dev
---

*nodejs modules*

* *wordpress-client*
 * used to speak to wordpress xml-rpc api
 * https://github.com/UsabilityDynamics/node-wordpress-client
* *config*
  * used to keep config files separated from code
  * https://github.com/lorenwest/node-config

why?
----

because https://github.com/wetterfrosch/etherpost#what-can-be-done

