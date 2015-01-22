etherpost.js
============

etherpost.js is a nodejs app which fetches an etherpad and writes it to an existing to wordpress post using the XML-RPC-API.

So we can have multiple users editing an wordpress-post simultaniously and update it periodically.


usage
-----

* download repository
* Set your app properties in ```config/production.js```

* ```
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
        "interval": 5000
    }
```
* run

```
    npm install
    export NODE_ENV=production
    node etherpost.js
```


why?
----

because https://github.com/wetterfrosch/etherpost#what-can-be-done

