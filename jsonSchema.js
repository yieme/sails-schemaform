
(function() {
  'use strict';

	var jsonic = require('jsonic')
	var _      = require('lodash')

	function sailsSchemaform(attributes, options) {
		options = options || {}
		if (typeof options === 'string') {
			if (options == '*') {
				options = { fields: '*' }
			} else if (options.indexOf(':') < 0) {
				options = { fields: options }
			} else {
				try {
					options = jsonic(options)
				} catch(e) {
					options = { title: 'Invalid sailsSchemaForm: ' + options, fields: '' }
				}
			}
		}
		var properties = {}
		if (!options.fields || options.fields == '*') {
			properties = _.clone(attributes) || {}
		} else {
			var fields = options.fields.split(',')
			_.each(attributes, function(n, key) {
				if (fields.indexOf(key) >= 0) {
					properties[key] = n
				}
			})
		}
		if (properties.createdAt) delete properties.createdAt
		if (properties.updatedAt) delete properties.updatedAt
		var schema = {
		  "title":      options.title || 'Sails Schema Form',
		  "type":       "object",
		  "properties": properties
		}
		return schema
	}

	module.exports = sailsSchemaform
})();
