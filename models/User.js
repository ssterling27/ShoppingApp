const { model, Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, { timestamps: true })
// bringing in passport-local-mongoose to handle authentication
User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)
