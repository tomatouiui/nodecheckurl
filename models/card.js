const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
      },
  }, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;