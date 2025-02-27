import generarJWT from "../helpers/crearJWT.js";
import Usuario from "../models/Usuario.js"; 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Por favor llene los campos" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }

        const validacionEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!validacionEmail.test(email)) {
            return res.status(400).json({ message: "Formato de email no válido" });
        }

        const usuario = await Usuario.findOne({ email }).select("+password");
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const passwordValido = password === usuario.password;
        if (!passwordValido) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = generarJWT(usuario.id, "usuarioTuti");

        res.status(200).json({
            token,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

export { login };
