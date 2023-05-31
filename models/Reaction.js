//Reaction model/schema
const { Schema, model, Types } = require('mongoose');
//require the dateFormat module
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = new Schema(
    {
        //reactionId uses mongoose's ObjectId data type and default value is set to a new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        //reactionBody is a string and is required with a max length of 280 characters
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        //username is a string and is required
        username: {
            type: String,
            required: true
        },
        //createdAt uses the Date type and default value is set to the current timestamp
        //use a getter method to format the timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//create the Reaction model using the ReactionSchema
const Reaction = model('Reaction', ReactionSchema);

//export the ReactionSchema
module.exports = Reaction;
