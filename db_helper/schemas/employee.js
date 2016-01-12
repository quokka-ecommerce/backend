/**
 * Define employee schema here
 * Created by longNightKing on 12/10/15.
 */
var Employee = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Employee.collection = 'employee';
Employee.attribute = {
    name: 'String',
    user_name: 'String',
    password: 'String',
    basic: 'Object'
};
Employee.schema  = new Schema({
    basic: basic.schema,
    name: String,
    user_name: String,
    password: String
}, {
    collection: Employee.collection
});