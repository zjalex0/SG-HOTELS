const { Schema, model } = require('mongoose')

const EmailVerified = new Schema({
  email: { type: String, required: false, trim: true },
  password: { type: String, required: false, trim: true },
  emailSubjet: { type: String, required: false, trim: true },
  headboard: { type: String, required: false, trim: true },
  subject: { type: String, required: false, trim: true },
  plain: { type: String, required: false, trim: true },
  body: { type: String, required: false, trim: true },
  emailDestiny: { type: String, required: false, trim: true }
})

module.exports = model('EmailVerified', EmailVerified)
