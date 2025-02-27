import Cliente from "../models/Cliente.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes" });
    }
};

const detalleCliente = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID no válido" });
        }
        const clienteBDD = await Cliente.findById(id);

        if (!clienteBDD) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.status(200).json(clienteBDD);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente" });
    }
};

const crearCliente = async (req, res) => {
    try {
        const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento } = req.body;

        if (!cedula || !nombre || !apellido || !ciudad || !email || !direccion || !telefono || !fecha_nacimiento) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (!/^\d{10}$/.test(cedula)) {
            return res.status(400).json({ message: "La cédula debe tener exactamente 10 dígitos numéricos" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Formato de email no válido" });
        }

        if (!/^\d{9,10}$/.test(telefono)) {
            return res.status(400).json({ message: "Número de teléfono no válido" });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_nacimiento)) {
            return res.status(400).json({ message: "Formato de fecha de nacimiento no válido (YYYY-MM-DD)" });
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(nombre) || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(apellido)) {
            return res.status(400).json({ message: "Nombre y apellido deben contener solo letras y al menos 2 caracteres" });
        }

        const clienteExistente = await Cliente.findOne({ $or: [{ cedula }, { email }] });
        if (clienteExistente) {
            return res.status(400).json({
                message: clienteExistente.cedula === cedula ? "La cédula ya está registrada" : "El email ya está registrado"
            });
        }

        const cliente = new Cliente({ cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento });
        await cliente.save();

        res.status(201).json({ message: "Cliente creado correctamente" });
    } catch (error) {
        console.error("Error en crearCliente:", error);
        res.status(500).json({ message: "Error al crear el cliente" });
    }
};


const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID no válido" });
        }

        if (!cedula || !nombre || !apellido || !ciudad || !email || !direccion || !telefono || !fecha_nacimiento) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (!/^\d{10}$/.test(cedula)) {
            return res.status(400).json({ message: "La cédula debe tener exactamente 10 dígitos numéricos" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Formato de email no válido" });
        }

        if (!/^\d{9,10}$/.test(telefono)) {
            return res.status(400).json({ message: "Número de teléfono no válido" });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_nacimiento)) {
            return res.status(400).json({ message: "Formato de fecha de nacimiento no válido (YYYY-MM-DD)" });
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(nombre) || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(apellido)) {
            return res.status(400).json({ message: "Nombre y apellido deben contener solo letras y al menos 2 caracteres" });
        }

        const clienteBDD = await Cliente.findById(id);
        if (!clienteBDD) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        if (cedula !== clienteBDD.cedula) {
            const clienteExistente = await Cliente.findOne({ cedula });
            if (clienteExistente) {
                return res.status(400).json({ message: "La cédula ya está registrada" });
            }
        }

        const clienteActualizado = await Cliente.findByIdAndUpdate(id,{ cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento },{ new: true, runValidators: true });

        res.status(200).json({ message: "Cliente actualizado correctamente" });

    } catch (error) {
        console.error("Error en actualizarCliente:", error);
        res.status(500).json({ message: "Error al actualizar el cliente" });
    }
};

const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID no válido" });
        }

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await Cliente.findByIdAndDelete(id);

        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el cliente" });
    }
};

export {
    listarClientes,
    detalleCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};
