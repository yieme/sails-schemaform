(function() {

	'use strict';

	var _      = require('lodash')
	var jsonic = require('jsonic')
	var fs     = require('fs')
	var path   = require('path')
	var compliedTemplate = {}

	/*
	options JSONIC string, ex:
		type:basic,module:myModule,controller:myController
	optonal .js will be dropped
	module:myModule,controller:myController.js
	*/

	function formController(options, callback) {
		if (typeof options == 'string') {
			options = options.replace('.js', '') // drop trailing .js if any
			options = jsonic(options)
		}
		options = options || {}
		options.type       = options.type       || 'basic'
		options.module     = options.module     || 'myModule'
		options.controller = options.controller || 'myController'
		var type = options.type
		if (type.indexOf('.') >= 0 || type.indexOf('/') >= 0) {
			callback('Invalid formController type: ' + type)
		}

		function renderTemplate(type, data) {
			var result = compliedTemplate[type](data)
			callback(null, result)
		}

		if (compliedTemplate[type]) {
			renderTemplate(type, options)
		} else {
			var templateFile = path.normalize(__dirname + '/templates/controller/' + type + '.js')
			fs.fileExists(templateFile, function(exists) {
				fs.readFileSync(templateFile, 'utf8', function(err, template) {
					compliedTemplate[type] = _.template(template)
				})
			})
		}
	}

	module.exports = formController
})();
