const { Schema, model } = require('mongoose')

const HotelSchema = Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String
  },
  image: String,
  phone: String,
  email: String,
  stars: Number,
  website: String,
  amenities: [String],
  active: Boolean
})

module.exports = model('Hotel', HotelSchema)
