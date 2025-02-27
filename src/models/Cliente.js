import {Schema, model} from 'mongoose'


const clienteSchema = new Schema({
    cedula:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    ciudad:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:String,
        trim:true,
        default:null
    },
    fecha_nacimiento:{
        type:Date,
        require:true
    },
},{
    timestamps:true
})

export default model('Clientes',clienteSchema)