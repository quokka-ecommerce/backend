/**
 * Define conversation schema here
 * Created by longNightKing on 12/10/15.
 */
var Conversation = exports;
var Schema = require('mongoose').Schema;
var basic = require('./basic');

Conversation.collection = 'conversation';
Conversation.attribute = {
    user_id: 'ObjectId',
    agent_id: 'ObjectId',
    msg_list: 'Object',
    basic: 'Object'
};
Conversation.schema  = new Schema({
    basic: basic.schema,
    user_id: Schema.ObjectId,
    agent_id: Schema.ObjectId,
    msg_list: [{sender_id: Schema.ObjectId, time_stamp: Date, content: String}]
}, {
    collection: Conversation.collection
});