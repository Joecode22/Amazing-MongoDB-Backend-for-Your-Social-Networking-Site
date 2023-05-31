//Reaction model/schema
const { Schema, model, Types } = require('mongoose');
//require the dateFormat module
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = new Schema(
    {
        