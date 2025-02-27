import {Schema, model} from 'mongoose'

const productosSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    codigo:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        trim:true,
        default:null
    },
    categoria:{
        type:String,
        require:true,
        trim:true
    },
    precio:{
        type:Number,
        require:true,
        trim:true,
    },
    stock:{
        type:Number,
        require:true,
        trim:true
    },
    fecha_ingreso:{
        type:Date,
        require:true,
        trim:true
    },
    proveedor:{
        type:String,
        require:true
    },
})


export default model('Productos',productosSchema)