const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const mailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Mail", mailSchema);
