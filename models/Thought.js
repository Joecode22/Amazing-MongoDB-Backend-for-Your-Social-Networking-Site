//Thought Model/Schema
const { Schema, model, Types } = require('mongoose');

//require the dateFormat module
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //use a getter method to format the timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        //use ReplySchema to validate data for a reply
        replies: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        //prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//export the Thought model
module.exports = Thought;



