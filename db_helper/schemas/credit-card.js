/**
 * Define credit card schema here
 * Created by longNightKing on 12/10/15.
 */
var CreditCard = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

CreditCard.collection = 'credit_card';
CreditCard.attribute = {
    name_on_card: 'String',
    card_num: 'String',
    safe_code: 'Number',
    type: 'String',
    expiration_date: 'Date',
    basic: 'Object'
};
CreditCard.schema  = new Schema({
    basic: basic.schema,
    name_on_card: String,
    card_num: Number,
    safe_code: Number,
    type: String,
    expiration_date: {type: Date, min: Date.now}
}, {
    collection: CreditCard.collection
});