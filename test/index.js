var should = require('chai').should(),
    sailsSchemaform = require('..')
;

describe('sails-schemaform', function() {
  it('should say hello', function(done) {
    var test = sailsSchemaform()
    test.value.should.equal('Hello, world');
    done();
  });
});
