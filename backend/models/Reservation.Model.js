const { Schema, model } = require('mongoose')

const Reservation = Schema({
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  guestEmail: {
    type: String,
    required: true
  },
  guestPhone: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  confirm:{
    type: Boolean,
    default: false
  },
  state: {
    type: String
  },
  emergencyContactName: {
    type: String,
    required: true
  },
  emergencyContactPhone: {
    type: String,
    required: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }
}, { timestamps: true })

module.exports = model('Reservation', Reservation)
