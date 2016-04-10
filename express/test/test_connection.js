var vows = require('vows'),
    assert = require('assert'),
  http = require("http");

var server = require("../bin/www");   // starts the server

exports.suite1 = vows.describe('server-test').addBatch({
  "the root URL": {
    topic: function () {
      var options = {
        host: "localhost",
        port: 8081,
        path: "/"
      };
      var callback = this.callback;
      http.get(options, function (response) {
        callback(null, response);
      }).on('error', function (error) {
        console.log("Got error: " + error.message);
        callback(error);
      });
    },
    "returns status OK": function (response) {
      assert.equal(response.statusCode, 200);
      assert.equal(response.httpVersion, "1.1");
    }
  }
});

exports.suite2 = vows.describe('server-test').addBatch({
  'terminate server': {
    topic: function() {
      server.server.close(this.callback); // this is a regular node require(`http`) server, reused in several batches
    },
    'should be listening': function() {
      assert.isTrue(true);
    }
  }
});

/* This test is necessary to ensure the topic execution.
 * A topic without tests will be not executed 
 assert.isTrue(true);
 */