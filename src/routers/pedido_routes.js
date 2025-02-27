import { Router } from 'express'
import  verificarAutenticacion  from '../middlewares/autenticacion.js'
import { actualizarPedido, crearPedido, detallePedido, eliminarPedido, listarPedidos } from '../controllers/pedido_controller.js'

const router = Router()

router.get('/pedidos',verificarAutenticacion,listarPedidos)
router.get('/pedidos/:id',verificarAutenticacion,detallePedido)
router.put('/pedidos/:id',verificarAutenticacion,actualizarPedido)
router.delete('/pedidos/:id',verificarAutenticacion,eliminarPedido)
router.post('/pedidos',verificarAutenticacion,crearPedido)

export default router