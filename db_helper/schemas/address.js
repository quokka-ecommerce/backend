/**
 * Define address schema here
 * Created by longNightKing on 12/10/15.
 */
var Address = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Address.collection = 'address';
Address.attribute = {
    first_line: 'String',
    second_line: 'String',
    city: 'String',
    state: 'String',
    zip: 'Number',
    basic: 'object'
};
Address.schema = new Schema({
    basic: basic.schema,
    first_line: String,
    second_line: String,
    city: String,
    state: String,
    zip: Number
}, {
    collection: Address.collection
});