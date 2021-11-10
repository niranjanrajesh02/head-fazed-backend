const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  client_id: String,
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email_verified: Boolean,
  tenant: String,
  connection: String,
})

module.exports = mongoose.model('User', userSchema);
// https://stackoverflow.com/questions/19145039/associative-array-with-mongoose-schema