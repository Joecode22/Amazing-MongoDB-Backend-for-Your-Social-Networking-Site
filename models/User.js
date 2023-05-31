const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'true',
        trim: true
    },
    email: {
        type: String,
        required: 'true',
        unique: true,
        match: [/.+@.+\..+/, 'This is not a valid email address!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    });
// User

// username

// String
// Unique
// Required
// Trimmed
// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)