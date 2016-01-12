/**
 * Define product schema here
 * Created by longNightKing on 12/10/15.
 */
var Product = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Product.collection = 'product';
Product.attribute = {
    product_name: 'String',
    upc: 'String',
    category_l1: 'String',
    category_l2: 'String',
    category_l3: 'String',
    unit: 'String',
    unit_num: 'Number',
    brand: 'String',
    original_country: 'String',
    current_price: 'Number',
    current_stock: 'Number',
    product_description: 'String',
    vendor_id: 'String',
    history_price: 'Number',
    img_links: 'String',
    attributes: 'Array',
    reviews: 'Array',
    sale_id: 'Array',
    basic: 'Object'
};
Product.schema = new Schema({
    basic: basic.schema,
    sale_id: [String],
    reviews: [String],
    attributes: [String],
    product_name: String,
    upc: String,
    category_l1: String,
    category_l2: String,
    category_l3: String,
    unit: String,
    unit_num: Number,
    brand: String,
    original_country: String,
    current_price: Number,
    current_stock: Number,
    product_description: String,
    vendor_id: String,
    history_price: Number,
    img_links: String
}, {
    collection: Product.collection
});