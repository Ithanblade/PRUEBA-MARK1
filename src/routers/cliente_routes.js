import { Router } from 'express'
import  verificarAutenticacion  from '../middlewares/autenticacion.js'
import { listarClientes, detalleCliente, crearCliente, actualizarCliente, eliminarCliente} from '../controllers/cliente_controller.js'

const router = Router()

router.get('/clientes',verificarAutenticacion,listarClientes)
router.get('/clientes/:id',verificarAutenticacion,detalleCliente)
router.post('/clientes',verificarAutenticacion,crearCliente)
router.put('/clientes/:id',verificarAutenticacion,actualizarCliente)
router.delete('/clientes/:id',verificarAutenticacion,eliminarCliente)


export default router
