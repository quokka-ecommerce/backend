/**
 * Created by longNightKing on 12/8/15.
 */

var express = require('express');
var router = express.Router();
var DBHelper = require('quokka-dao-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('layout', {title: 'DBMS - Home'});
});

router.get('/collections', function(req, res) {
    var collectionList = DBHelper.getCollectionNameList();
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(collectionList));
});

router.get('/table/:name', function(req, res) {
    var name  = req.params.name;
    var schema = DBHelper.getSchemaByName(name);
    if(typeof schema === "undefined") {
        res.writeHead(404);
        res.end("not found");
    }
    var isTimeOut = true;
    DBHelper.queryAllByCollectionName(name, function(err, data){
        if(!err){
            isTimeOut = false;
            //res.json(getTableRenderObject(name, schema, data));
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(getTableRenderObject(name, schema, data)));
        }
    });
    setTimeout(function(){
        if(isTimeOut){
            res.writeHead(404);
            res.end("not found");
        }
    }, 10 * 1000);
});

router.post('/table/:name', function(req, res) {
    var name  = req.params.name;
    var schema = DBHelper.getSchemaByName(name);
    if(typeof schema === "undefined") {
        res.writeHead(404);
        res.end("not found");
    }
    var isTimeOut = true;
    var docData = req.body;
    var docId = docData._id;
    delete docData._id;
    if(docId){
        DBHelper.updateOne(name, {_id: docId}, docData, function(err, raw){
            if(!err){
                isTimeOut = false;
                res.writeHead(200);
                res.end("Document Saved");
            }
        });
    }else{
        DBHelper.addOneDocToCollection(name, docData, function(err, raw){
            if(!err){
                isTimeOut = false;
                res.writeHead(200);
                res.end("Document added");
            }
        });
    }

    setTimeout(function(){
        if(isTimeOut){
            res.writeHead(404);
            res.end("not found");
        }
    }, 10 * 1000);
});

router.delete('/table/:name', function(req, res) {
    var name  = req.params.name;
    var docId = req.query;
    var schema = DBHelper.getSchemaByName(name);
    if(typeof schema === "undefined") {
        res.writeHead(404);
        res.end("not found");
    }
    var isTimeOut = true;
    DBHelper.removeOneDocFromCollection(name, {_id: docId}, function(err){
        if(!err){
            isTimeOut = false;
            res.writeHead(200);
            res.end("Document droped");
        }
    });
    setTimeout(function(){
        if(isTimeOut){
            res.writeHead(404);
            res.end("not found");
        }
    }, 10 * 1000);
});

function getTableRenderObject(name, schema, data){
    var dataArray = [];
    data.forEach(function(document){
        var jsObj = document.toObject();
        delete jsObj.__v;
        dataArray[dataArray.length] = jsObj;
    });
    return {
        title: "Table - " + name,
        tableName: name,
        tableSchema: schema,
        tableData: dataArray
    }
}

module.exports = router;
