/**
 * Created by longNightKing on 12/9/15.
 */
var DBHelper = exports;
DBHelper.dbUrl = 'mongodb://localhost/27017/test';

var mongoose = require('mongoose'),
    assert = require('assert');
var Schema = mongoose.Schema,
    TAG = 'DBHelper:';

var defaultSchema = {
    createAt: {type: Date, default: Date.now},
    updateAt: Date,
    acl: {
        read: {type: Boolean, default: true},
        write: {type: Boolean, default: true},
        users: [Schema.ObjectId],
        roles: [Schema.ObjectId]
    }
};

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

DBHelper.getCollections = function (){
    connect(function(){
        mongoose.connection.db.listCollections().toArray(function(err, names){
            if(err){
                console.log(TAG, err);
            }else{
                names.forEach(function(collection) {
                    console.log(TAG, collection.name);
                });
                collections = names;
            }
            close();
        });
    });
}

DBHelper.addCollection = function(name){
    var ModelByName = mongoose.model(name, new Schema(defaultSchema, {collection: name}));
    var aDoc = new ModelByName();
    connect(function(){
        aDoc.save(function(err){
            close();
            if (err){
                console.error(TAG, err);
            }else{
                console.log(TAG, ' collection #' + name +'# add successfully.')
            }
        });
    });
}

DBHelper.queryByCollectionName = function(name){
    connect(function(){
        var cursor = mongoose.connection.db.collection(name).find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
            }
        });
        close();
    });
}

DBHelper.isCollectionExist = function(name, callback){
    connect(function(){
        var potentialCollection = mongoose.connection.db.collection(name);
        if(potentialCollection){
            console.log(TAG, "#" + name + "# already exist.");
        }else{
            console.log(TAG, "#" + name + "# not exist.");
        }
        close();
        callback(potentialCollection);
    });
}






