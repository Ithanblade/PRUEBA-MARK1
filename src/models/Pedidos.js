import {Schema, model} from 'mongoose'


const pedidoSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true
    },
    id_productos:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Productos',
            required: true
        }
    ]
})

export default model('Pedidos',pedidoSchema)