const { Schema, model } = require('mongoose');

const QuerySchema = new Schema({
    email: { type: String, required: true },
    query: { type: String, required: true },
    type: { type: String, required: true },
    outValues: {type: [String], required: true},
    entryValues: {type: [String], required: true}
  }, {collection: 'queries'})

const Query = model('Query', QuerySchema);

module.exports = Query;