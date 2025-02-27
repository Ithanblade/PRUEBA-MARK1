import Pedido from "../models/Pedidos.js";
import Cliente from "../models/Cliente.js";
import Productos from "../models/Productos.js";
import mongoose from "mongoose";

const crearPedido = async (req, res) => {
    try {
        const { codigo, descripcion, id_cliente, id_productos } = req.body;

        if (!codigo || !descripcion || !id_cliente || !id_productos || id_productos.length === 0) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (codigo.length < 3) {
            return res.status(400).json({ message: "El código debe tener al menos 3 caracteres" });
        }

        if (descripcion.length < 3) {
            return res.status(400).json({ message: "La descripción debe tener al menos 3 caracteres" });
        }

        if (!mongoose.Types.ObjectId.isValid(id_cliente)) {
            return res.status(400).json({ message: "ID de cliente no válido" });
        }

        for (const id of id_productos) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: `ID de producto no válido: ${id}` });
            }
        }

        const cliente = await Cliente.findById(id_cliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const productos = await Productos.find({ _id: { $in: id_productos } });
        if (productos.length !== id_productos.length) {
            return res.status(400).json({ message: "Uno o más productos no existen" });
        }

        const pedidoExistente = await Pedido.findOne({ codigo });
        if (pedidoExistente) {
            return res.status(400).json({ message: "El código del pedido ya está registrado" });
        }

        const pedido = new Pedido({ codigo, descripcion, id_cliente, id_productos });
        await pedido.save();

        res.status(201).json({ message: "Pedido creado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al crear el pedido" });
    }
};

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate("id_cliente", "nombre apellido email").populate("id_productos", "nombre precio categoria codigo");
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pedidos" });
    }
};

const detallePedido = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID no válido" });
        }

        const pedido = await Pedido.findById(id).populate("id_cliente", "nombre apellido email").populate("id_productos", "nombre precio categoria codigo");

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.status(200).json(pedido);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener el detalle del pedido" });
    }
};

const actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, descripcion, id_cliente, id_productos } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID no válido" });
        }

        const pedidoBDD = await Pedido.findById(id);
        if (!pedidoBDD) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        if (!codigo || !descripcion || !id_cliente || !id_productos || id_productos.length === 0) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (!mongoose.Types.ObjectId.isValid(id_cliente)) {
            return res.status(400).json({ message: "ID de cliente no válido" });
        }

        for (const id of id_productos) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: `ID de producto no válido: ${id}` });
            }
        }

        const cliente = await Cliente.findById(id_cliente);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const productos = await Productos.find({ _id: { $in: id_productos } });
        if (productos.length !== id_productos.length) {
            return res.status(400).json({ message: "Uno o más productos no existen" });
        }

        if (codigo !== pedidoBDD.codigo) {
            const pedidoExistente = await Pedido.findOne({ codigo });
            if (pedidoExistente) {
                return res.status(400).json({ message: "El código del pedido ya está registrado" });
            }
        }

        const pedidoActualizado = await Pedido.findByIdAndUpdate(id,{ codigo, descripcion, id_cliente, id_productos },{ new: true, runValidators: true });

        res.status(200).json({ message: "Pedido actualizado correctamente"});

    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        res.status(500).json({ message: "Error al actualizar el pedido" });
    }
};

const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID no válido" });
        }

        const pedido = await Pedido.findById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        await Pedido.findByIdAndDelete(id);
        res.status(200).json({ message: "Pedido eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el pedido" });
    }
};

export { 
    crearPedido, 
    listarPedidos, 
    detallePedido, 
    actualizarPedido, 
    eliminarPedido 
};
