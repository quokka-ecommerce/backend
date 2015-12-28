/**
 * Define promotion schema here
 * Created by longNightKing on 12/10/15.
 */
var Promotion = exports;
var Schema = require('mongoose').Schema;
var basicAttribute = require('./basic');

Promotion.collection = 'promotion';
Promotion.schema = new Schema({
    basic: basicAttribute
}, {
    collection: Promotion.collection
});