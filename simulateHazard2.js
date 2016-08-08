/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

var request = require("request");
var config = require( "./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Simulates a hazard event for an existing user and shield. Both user and shield must exist and be associated.
 * The connection information is taken from config.js
 */
var simulateHazard = function(parameters) {
  console.info("Using the /global/sendPayloadToMQTT REST endpoint to simulate an event...");
  var reqUrl = config.api + "/global/sendPayloadToMQTT/" + parameters.outputtype + "/" + parameters.devicetype + "/" + parameters.deviceid + "/" + parameters.type;

  console.info("Using URL " + reqUrl);

  request({
    url: reqUrl,
    method: "POST",
    json: true,
    jar: csrfRequests.cookieJar,
    headers: {
      "X-CSRF-Token": csrfRequests.csrfToken,
    },
    body: parameters.payload,
    auth: config.credentials
  }, function (error, response, body) {
    if (error) {
      console.log("\tSimulate hazard failed. Reason is: " + error);
    }
    else if (response.statusCode != 200) {
      console.error("\tSimulate hazard failed. Reason is: " + response.statusCode);
    }
    else {
      console.log("\nSimulate hazard succeeded.\nThe event can be seen in the dashboard or through the /hazardEvents/all API\n\nIf the event is not visible in the dashboard or through the API you need to refresh the IoT4I analytics engine. Call \n\tnode updateAnalyticsEngine.js");
    }

    if (body) {
      console.dir(body);
    }
  });
};

var hazardParams = {
  "payload": {
      "usr": "user2",	// user id must exist ( see createUser.js)
      "liquid_detected": "true",
      "policy_id": "456",
      "temperature":"12",
      "extra": {
        "locationDesc": "test kitchen",
        "deviceDesc": "Amazing device"
      },
    },
    "outputtype": "evt",
    "devicetype": "wink",
    "deviceid": "wink",
    "type": "wink"
  };


csrfRequests.requestAPIWithCSRF(simulateHazard, hazardParams);


