const Holder = require('../models/Holder');
const bcrypt = require('bcryptjs'); 
const token=require("../middleware/validar-jwt")
const { generarJWT } = require('../middleware/validar-jwt');

const holderController = {
    postlogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const holder = await Holder.findOne({ email });
            if (!holder) {
                return res.status(404).json({ msg: "Holder no encontrado" });
            }
            
            if (holder.estado === 0) {
                return res.status(403).json({ msg: "Holder inactivo" });
            }
    
            const validarPassword = bcrypt.compareSync(password, holder.password);
            console.log("contraseña recibida:",password)
            console.log("constraseña almacenada ", holder.password)
            console.log("constraseña valida",validarPassword)
            if (!validarPassword) {
                return res.status(401).json({ msg: "Password incorrecto" });
            } 
    
            const token = await generarJWT(holder.id);
            res.json({ holder, token });
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ msg: "No se pudo realizar la operación" });
        }
    },

    getListarTodos: async (req, res) => {
        try {
            const holders = await Holder.find();
            res.json({ holders });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    getListarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findById(id);
            if (!holder) return res.status(404).json({ error: "Holder no encontrado" });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    postHolder: async (req, res) => {
        const { email, password, document, name, rol, phone } = req.body;
        try {
            const existingHolder = await Holder.findOne({ email });
            if (existingHolder) {
                return res.status(400).json({ msg: "El email ya está en uso" });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            
            const holder = new Holder({ email, password: hashedPassword, document, name, rol, phone });
            await holder.save();
            res.json({ msg: "Holder creado con éxito", holder });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putModificar: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const holder = await Holder.findByIdAndUpdate(id, updatedData, { new: true });
            if (!holder) return res.status(404).json({ error: "Holder no encontrado" });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!holder) return res.status(404).json({ error: "Holder no encontrado" });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const holder = await Holder.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!holder) return res.status(404).json({ error: "Holder no encontrado" });
            res.json({ holder });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
            console.log("Contraseña recibida:", password);
      console.log("Contraseña almacenada:", holder.password);
        }
    }
};

module.exports = holderController;
