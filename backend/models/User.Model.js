const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  typeDoc: {
    type: String,
    required: false
  },
  ID: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  emergencyContactName: {
    type: String,
    required: false
  },
  emergencyContactPhone: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  roles: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  }
})

module.exports = model('User', UserSchema)
