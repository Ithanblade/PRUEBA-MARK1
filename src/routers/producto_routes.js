import { Router } from 'express'
import  verificarAutenticacion  from '../middlewares/autenticacion.js'
import { actualizarProducto, crearProducto, detalleProducto, eliminarProducto, listarProductos } from '../controllers/producto_controller.js'

const router = Router()

router.get('/productos',verificarAutenticacion,listarProductos)
router.get('/productos/:id',verificarAutenticacion,detalleProducto)
router.post('/productos',verificarAutenticacion,crearProducto)
router.put('/productos/:id',verificarAutenticacion,actualizarProducto)
router.delete('/productos/:id',verificarAutenticacion,eliminarProducto)

export default router