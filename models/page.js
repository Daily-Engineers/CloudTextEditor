'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pageSchema = new Schema({
  content: String,
  page_id: String,
  published: {
    type: Date,
    default: Date.now,
  },
  published_by: String,
  owners: Array,
  editors: Array,
  viewers: Array
})

module.exports = mongoose.model('Page', pageSchema);
