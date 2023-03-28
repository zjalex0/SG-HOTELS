const { Schema, model } = require('mongoose')

const Room = Schema({
  title: {
    type: String
  },
  roomNumber: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Habitación sencilla', 'Habitación doble', 'Habitación triple', 'Habitación cuádruple', 'Suite', 'Habitación ejecutiva'],
    required: true
  },
  active: Boolean,
  description: String,
  price: {
    type: Number,
    required: true
  },
  amenities: {
    type: Array,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel'
  },
})

module.exports = model('Room', Room)
