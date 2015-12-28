/**
 * Define sale schema here
 * Created by longNightKing on 12/10/15.
 */
var Sale = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Sale.collection = 'sale';
Sale.attribute = {
    basic: 'Object'
};
Sale.schema = new Schema({
    basic: basic.schema
}, {
    collection: Sale.collection
});