/**
 * Define product schema here
 * Created by longNightKing on 12/10/15.
 */
var Product = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Product.collection = 'product';
Product.attribute = {
    name: 'String',
    upc: 'String',
    category_l1: 'String',
    category_l2: 'String',
    category_l3: 'String',
    unit: 'String',
    unit_num: 'Number',
    brand: 'String',
    production_place: 'String',
    current_price: 'Number',
    stock: 'Number',
    detail: 'String',
    vendor_id: 'String',
    history_price: 'Number',
    attribute: 'Object',
    review_list: 'Array',
    img_links: 'Array',
    sale_id: 'Array',
    basic: 'Object'
};
Product.schema = new Schema({
    basic: basic.schema,
    name: String,
    upc: String,
    category_l1: String,
    category_l2: String,
    category_l3: String,
    unit: String,
    unit_num: Number,
    brand: String,
    production_place: String,
    current_price: Number,
    stock: Number,
    detail: String,
    vendor_id: String,
    history_price: Number,
    sale_id: [String],
    img_links: [String],
    review_list: [{
      userId: String,
      content: String,
      stars: Number
    }],
    attribute: {
        color:[String],
        type: String,
        flavor: String
    }
}, {
    collection: Product.collection
});