const {Schema, model} = require("mongoose");

const OrdenSchema = Schema({
    idUsuario: {type: String},

    carro: {
        type: Schema.Types.ObjectId,
        ref: 'Carro'
    },

    monto: {type: Number},

    direccion: {
        calle: {type: String},
        cp: {type: Number},
        ciudad: {type: String},
        pais: {type: String},
    }


});

OrdenSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Orden', OrdenSchema );