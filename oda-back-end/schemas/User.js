const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, {collection: 'users'})

const User = model('User', UserSchema);

module.exports = User;