const { Schema, model } = require("mongoose");

const ProductoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    img: {type: String},

    categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
    },

    talle: {type: String},

    color: {type: String},

    precio: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

ProductoSchema.methods.toJSON = function(){
  const {__v, ...data} = this.toObject();
  return data;
}

module.exports = model("Producto", ProductoSchema);
