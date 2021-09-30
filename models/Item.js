const { model, Schema } = require('mongoose')

const Item = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shopping_link: {
    type: String,
    required: true
  },
  video_link: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = model('Item', Item)
