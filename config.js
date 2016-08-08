/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/


/**
 * The configuration for the API Example. 
 * <instanceid> -  replace in the API and Aggregator URLs with the value from the IoT4I service URL
 * <password> - read from the IoT4I Service Credentials page
 */
var config = module.exports = {
	api: "https://iot4insurance-api-azl.mybluemix.net", // the URL must not end with /
	aggregator: "https://iot4i-aggregator-azl.mybluemix.net", // the URL must not end with /
	credentials : {
		user: "Admin",
		pass: "987437a3-7049-4d93-931e-b1c006761426"
	}
};
