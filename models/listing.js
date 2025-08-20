const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://unsplash.com/photos/manarola-italy-rknrvCrfS1k"
    }
  },
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
