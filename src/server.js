import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

import routerCliente from './routers/cliente_routes.js'
import routerUsuario from './routers/usuario_routes.js';
import routerProducto from './routers/producto_routes.js';
import routerPedido from './routers/pedido_routes.js';

const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.PORT || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.use('/api',routerCliente)
app.use('/api',routerUsuario)
app.use('/api',routerProducto)
app.use('/api',routerPedido)


app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


export default  app