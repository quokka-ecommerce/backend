/**
 * Define Oder schema here
 * Created by longNightKing on 12/10/15.
 */
var Order = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Order.collection = 'order';
Order.attribute = {
    time_stamp: 'Date',
    user_id: 'ObjectId',
    recipient: 'String',
    credit_card_id: 'ObjectId',
    shipment: 'Object',
    product_list: 'Array',
    shipping_address: 'Object',
    basic: 'Object'
};
Order.schema  = new Schema({
    basic: basic.schema,
    time_stamp: Date,
    user_id: Schema.ObjectId,
    recipient: String,
    shipping_address: {
        first_line: String,
        second_line: String,
        city: String,
        state: String,
        zip: Number
    },
    credit_card_id: Schema.ObjectId,
    product_list: [{}],
    shipment: {
        id: Number,
        company: String,
        method: String,
        tracking_num: String,
        ETA: Date,
        status: String,
        link: String
    }
}, {
    collection: Order.collection
});