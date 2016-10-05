'use strict';

var Promise = require('bluebird');

/**
 * A wrapper around a websocket, providing
 * methods for interacting with clients.
 * @param {Object} client - A panic-client handshake.
 * @param {Socket} client.socket - The socket.io connection.
 * @param {Object} client.platform - The client platform.js object.
 * @class Client
 */
function Client (client) {
	this.socket = client.socket;
	this.platform = client.platform;
}

Client.prototype = {
	constructor: Client,

	/**
	 * Sends a function to be run on the client.
	 * @param  {Function} job - A function to be run remotely.
	 * The function will be stringified, so it cannot depend on
	 * external "local" variables, including other functions.
	 * @param  {Object} [props] - Any variables used in the job.
	 * @return {Promise} - Resolves if the job finishes,
	 * rejects if it throws an error.
	 */
	run: function (job, props) {
		if (typeof job !== 'function') {
			throw new TypeError(
				'Expected job "' + job + '" to be a function.'
			);
		}

		var source = String(job);
		var jobID = Math.random()
			.toString(36)
			.slice(2);

		var socket = this.socket;

		socket.emit('run', source, jobID, props);

		/** Report the success or failure of the job. */
		return new Promise(function (resolve, reject) {
			socket.once('disconnect', resolve);

			socket.once(jobID, function (error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	},
};

module.exports = Client;