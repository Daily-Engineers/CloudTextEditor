'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pageSchema = new Schema({
    filename: String,
    content: String,
    page_id: String,
    published: {
        type: Date,
        default: Date.now,
    },
    published_by: {
        type: String,
        default: 'guest'
    },
    owners: Array,
    editors: Array,
    viewers: Array
})

module.exports = mongoose.model('Page', pageSchema);
