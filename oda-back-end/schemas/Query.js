const { Schema, model } = require("mongoose");

const QuerySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    query: { type: String, required: true },
    source: { type: String, required: true },
    type: { type: String, required: true },
    outValues: { type: [String], required: true },
    entryValues: { type: [String], required: true },
  },
  { collection: "queries" }
);

const Query = model("Query", QuerySchema);

module.exports = Query;
