/**
 * Define vendor schema here
 * Created by longNightKing on 12/10/15.
 */
var Vendor = exports;
var Schema = require('mongoose').Schema;
var basic= require('./basic');

Vendor.collection = 'vendor';
Vendor.attribute = {
    basic: 'Object'
};
Vendor.schema = new Schema({
    basic: basic.schema
}, {
    collection: Vendor.collection
});