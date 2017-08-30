var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SchemaData   = new Schema({
    name: String,
    address:String
});

module.exports = mongoose.model('schData', SchemaData);
