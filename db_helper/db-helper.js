/**
 * Created by longNightKing on 12/9/15.
 */
var DBHelper = exports;
var mongoose = require('mongoose'),
    assert = require('assert'),
    Schema = mongoose.Schema,
    User = require('./schemas/user'),
    Address = require('./schemas/address'),
    CreditCard = require('./schemas/credit-card'),
    Conversation = require('./schemas/conversation'),
    Employee = require('./schemas/employee'),
    Order = require('./schemas/order'),
    Product = require('./schemas/product'),
    Promotion = require('./schemas/promotion'),
    Sale = require('./schemas/sale'),
    Vendor = require('./schemas/vendor'),
    TAG = 'DBHelper:';

var collectionList = [User, Address, CreditCard,
    Conversation, Employee, Order, Product,
    Promotion, Sale, Vendor];

function connect(successCallBack){
    mongoose.connect(DBHelper.dbUrl);
    var db = mongoose.connection;
    db.on('error', function(){
        console.error.bind(console, TAG, 'connection error.');
        db.close();
    });
    db.once('open', function() {
        console.log(TAG, 'db connected.');
        successCallBack();
    });
}

function close(){
    mongoose.connection.close();
    console.log(TAG, 'db closed.');
}

function getSchemaInstanceByName(name){
    console.log(TAG, "client wants " + name);
    for(var i = 0; i < collectionList.length; i++){
        if(name.localeCompare(collectionList[i].collection) == 0){
            return collectionList[i];
        }
    }
    return undefined;
}

function getModelByCollection(name){
    var schema = getSchemaInstanceByName(name).schema;
    if(typeof schema === "undefined"){
        return undefined;
    }
    return mongoose.model(name, schema);
}

DBHelper.dbUrl = 'mongodb://localhost/27017/test';

DBHelper.getCollectionNameList = function(){
    var list = [];
    for(var i = 0; i < collectionList.length; i++){
        list[list.length] = collectionList[i].collection;
    }
    return list;
}

DBHelper.getSchemaByName = function(name){
    var schemaInstance = getSchemaInstanceByName(name);
    if(typeof schemaInstance !== "undefined"){
        return schemaInstance.attribute;
    }
    return undefined;
}

DBHelper.addOneDocToCollection = function(name, data, callback){
    var ModelOfName = getModelByCollection(name);
    if(typeof ModelOfName !== "undefined"){
        var modelInstance = new ModelOfName(data);
        connect(function() {
            modelInstance.save(function (err) {
                close();
                if (err) {
                    console.log(TAG, "doc of " + name + " add failed.");
                    console.log(TAG, "error: " + err);
                }
                callback(err);
            });
        });
    }else{
        console.log(TAG, "collection: " + name + " not exist.");
    }
}

DBHelper.removeOneDocFromCollection = function(name, query, callback){
    var ModelOfName = getModelByCollection(name);
    if(typeof ModelOfName !== "undefined"){
        connect(function() {
            ModelOfName.remove(query, function(err){
                close();
                if(err){
                    console.log(TAG, "doc of " + name + " remove failed.");
                    console.log(TAG, "error: " + err);
                }
                callback(err);
            });
        });
    }else{
        console.log(TAG, "collection: " + name + " not exist.");
    }
}

DBHelper.updateOne = function(name, query, doc, options, callback){
    var ModelOfName = getModelByCollection(name);
    if(typeof ModelOfName !== "undefined"){
        connect(function() {
            ModelOfName.update(query, doc, options, function(err, raw){
                close();
                if(err){
                    console.log(TAG, name + " update failed.");
                    console.log(TAG, "error: " + err);
                }
                callback(err, raw);
            });
        });
    }else{
        console.log(TAG, "collection: " + name + " not exist.");
    }
}

DBHelper.queryAllByCollectionName = function(name, callback){
    var ModelOfName = getModelByCollection(name);
    if(typeof ModelOfName !== "undefined"){
        connect(function(){
            ModelOfName.find({}, function(err, docs){
                close();
                if(err){
                    console.log(TAG, name + " query all failed.");
                    console.log(TAG, "error: " + err);
                }
                callback(err, docs);
            });
        });
    }else{
        console.log(TAG, "collection: " + name + " not exist.");
    }
};