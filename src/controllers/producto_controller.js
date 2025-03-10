import Producto from "../models/Productos.js";
import mongoose from "mongoose";

const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los productos" });
    }
};

const detalleProducto = async (req, res) => {
    //localhost:3000/productos/612f1b7b7b7b7b7b7b7b7b7b
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json(producto);

    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el producto" });
    }       
};

const crearProducto = async (req, res) => {
    try {
        const { nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor } = req.body;

        if (!nombre || !codigo || !categoria || !precio || !stock || !fecha_ingreso || !proveedor) {
            return res.status(400).json({ msg: "Todos los campos obligatorios deben ser proporcionados" });
        }

        const productoExistente = await Producto.findOne({ codigo });
        if (productoExistente) {
            return res.status(400).json({ msg: "El código del producto ya está registrado" });
        }

        if (nombre.length < 2 ) {
            return res.status(400).json({ msg: "El nombre debe contener al menos 2 caracteres" });
        }

        if (!/^[a-zA-Z0-9]{3,}$/.test(codigo)) {
            return res.status(400).json({ msg: "El código debe ser alfanumérico y tener al menos 3 caracteres" });
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(categoria)) {
            return res.status(400).json({ msg: "La categoría debe contener solo letras y espacios" });
        }

        if (typeof precio !== "number" || precio <= 0) {
            return res.status(400).json({ msg: "El precio debe ser un número mayor a 0" });
        }

        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({ msg: "El stock debe ser un número entero mayor o igual a 0" });
        }

        const fecha = new Date(fecha_ingreso);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            return res.status(400).json({ msg: "La fecha de ingreso no es válida o es futura y debe tener el formato YYYY-MM-DD" });
        }

        if (proveedor.length < 2) {
            return res.status(400).json({ msg: "El proveedor debe tener al menos 2 caracteres" });
        }

        const nuevoProducto = new Producto({ nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor });
        await nuevoProducto.save();

        res.status(201).json({ msg: "Producto creado correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al crear el producto" });
    }
};


const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const productoBDD = await Producto.findById(id);
        if (!productoBDD) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        if (!nombre || !codigo || !categoria || !precio || !stock || !fecha_ingreso || !proveedor) {
            return res.status(400).json({ msg: "Todos los campos obligatorios deben ser proporcionados" });
        }

        if (codigo !== productoBDD.codigo) {
            const productoExistente = await Producto.findOne({ codigo });
            if (productoExistente) {
                return res.status(400).json({ msg: "El código del producto ya está registrado" });
            }
        }

        if (nombre.length < 2 ) {
            return res.status(400).json({ msg: "El nombre debe contener al menos 2 caracteres " });
        }

        if (!/^[a-zA-Z0-9]{3,}$/.test(codigo)) {
            return res.status(400).json({ msg: "El código debe ser alfanumérico y tener al menos 3 caracteres" });
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(categoria)) {
            return res.status(400).json({ msg: "La categoría debe contener solo letras y espacios" });
        }

        if (typeof precio !== "number" || precio <= 0) {
            return res.status(400).json({ msg: "El precio debe ser un número mayor a 0" });
        }

        if (!Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({ msg: "El stock debe ser un número entero mayor o igual a 0" });
        }

        const fecha = new Date(fecha_ingreso);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            return res.status(400).json({ msg: "La fecha de ingreso no es válida o es futura" });
        }

        if (proveedor.length < 2) {
            return res.status(400).json({ msg: "El proveedor debe tener al menos 2 caracteres" });
        }

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, codigo, descripcion, categoria, precio, stock, fecha_ingreso, proveedor },{ new: true, runValidators: true }
        );

        res.status(200).json({ msg: "Producto actualizado correctamente" });

    } catch (error) {
        console.error("Error en actualizarProducto:", error);
        res.status(500).json({ msg: "Error al actualizar el producto" });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID no válido" });
        }

        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        await Producto.findByIdAndDelete(id);

        res.status(200).json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el cliente" });
    }
};


export { 
    listarProductos, 
    detalleProducto, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
};