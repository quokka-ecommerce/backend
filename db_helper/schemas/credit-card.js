/**
 * Define credit card schema here
 * Created by longNightKing on 12/10/15.
 */

var Schema = require('mongoose').Schema;
var basicAttribute = require('./basic');

module.exports = new Schema({
    basic: basicAttribute,
    first_line: String,
    second_line: String,
    city: String,
    state: String,
    zip: Number
}, {
    collection: 'address'
});