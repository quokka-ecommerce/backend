/**
 * Basic attribute of each collection
 * Created by longNightKing on 12/10/15.
 */
var Schema = require('mongoose').Schema;

module.exports.schema = {
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    acl: {
        read: {type: Boolean, default: true},
        write: {type: Boolean, default: true},
        users: [Schema.ObjectId],
        roles: [Schema.ObjectId]
    }
};

module.exports.attribute = {
    createAt: 'Date',
    updateAt: 'Date',
    acl: 'ACL'
}