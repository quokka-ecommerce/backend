/**
 * Define promotion schema here
 * Created by longNightKing on 12/10/15.
 */
var Promotion = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Promotion.collection = 'promotion';
Promotion.attribute = {
    basic: 'Object'
};
Promotion.schema = new Schema({
    basic: basic.schema
}, {
    collection: Promotion.collection
});