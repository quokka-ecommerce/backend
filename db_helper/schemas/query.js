/**
 * Define query schema here
 * Created by longNightKing on 12/10/15.
 */
var Query = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Query.collection = 'query';
Query.attribute = {
    basic: 'Object'
};
Query.schema = new Schema({
    basic: basic.schema
}, {
    collection: Query.collection
});