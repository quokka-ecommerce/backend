/**
 * Define user schema here
 * Created by longNightKing on 12/10/15.
 */
var User = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

User.collection = 'user';
User.attribute = {
    user_name: 'String',
    email: 'String',
    credits: 'Number',
    profile: 'Object',
    shopping_cart: 'ObjectArray',
    conversation: 'Array',
    orders: 'Array',
    credit_card_list: 'Array',
    address_list: 'Array',
    basic: 'Object'
};
User.schema = new Schema({
    basic: basic.schema,
    user_name: String,
    email: String,
    credits: Number,
    address_list: [Schema.ObjectId],
    credit_card_list: [Schema.ObjectId],
    orders: [Schema.ObjectId],
    conversation: [Schema.ObjectId],
    shopping_cart: [{}],
    profile: {
        gender: {type: Boolean, default: true},
        DOB: {type: Date, default: Date.now},
        phone_num: Number
    },
}, {
    collection: User.collection
});