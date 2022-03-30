const {Schema, model }= require('mongoose');

const CarroSchema = Schema({
    idUsuario : {type: String, required: true},

    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {type: Number, default: 1}
    }]
},
{
    timestamp: true
}
);

CarroSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('Carro', CarroSchema);