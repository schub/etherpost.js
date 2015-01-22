/* load modules */
var config = require('config'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    wpClient = require('wordpress-client').create({
        url: config.wordpress.url,
        username: config.wordpress.username,
        password: config.wordpress.password
    });

/** 
 * Api
 */
var Api = {

    /**
     * Loads text content via get request. Calls success() if successful, logs an error otherwise.
     */
    loadSourceContent: function (url, success) {

        var callback = function (res) {
            var content = '';
            res.on('data', function (chunk) {
                content += chunk;
            });
            res.on('end', function () {
                success(content);
            });
        }

        http.get(url, callback)
            .on('error', function (e) {
                console.log('\tcould not load source content: ' + e.message);
            });
    },

    /**
     * Updates a wordpress blog post with given content and calls success() if
     * successful, logs an error otherwise.
     */
    updateBlogPost: function (postId, content, success) {

        function callback(error, data) {
            if (data.ok) {
                console.log('\tblog post updated');
            } else {
                console.error('\tcould not update blog post: ' + data.error);
            }
        };

        var requestData = {
            ID: postId,
            post_content: content
        };

        wpClient.insertPost(requestData, callback);
    },

    /**
     * Writes the given content to disk.
     */
    writeSourceToDisk: function (options, content) {

        var dateString = new Date().toISOString();
        var filePath = options.dir + '/' + options.fileNamePrefix + dateString + '.txt';

        fs.writeFile(filePath, content, function (err) {
            if (err) {
                console.log('\terror writing source content to disk: ' + err);
            } else {
                console.log('\tsource content written to disk: ' + filePath);
            }
        });
    }
};

/**
 * application logic
 */
var App = {

    gotSourceContent: function (content) {
        console.log('\tgot source content. length: ' + content.length);
        Api.writeSourceToDisk(config.backup, content);
        Api.updateBlogPost(config.wordpress.postId, content, this.gotUpdateBlogPostResult);
    },

    start: function () {

        var update = function () {
            var now = new Date();
            console.log('start updating blog post...');
            console.log('\tdatetime: ' + now);
            Api.loadSourceContent(config.sourceUrl, App.gotSourceContent);
        }

        setInterval(update, config.interval);
    }
};

// run app
App.start();