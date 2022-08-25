const { model, Schema } = require('mongoose')

const Recomendacion = new Schema({
  name: {
    type: String,
    required: true
  },
  hr: {
    type: String,
    required: true
  },
  etiqueta: {
    type: String,
    required: true
  },
}, { timestamps: true, versionKey: false })

module.exports = model('Recomendacion', Recomendacion)