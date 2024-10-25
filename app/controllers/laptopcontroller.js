const Laptop = require('../models/laptop');
const QRCode = require('qrcode');

const laptopController = {
    getListarTodos: async (req, res) => {
        try {
            const laptops = await Laptop.find().populate('holder', 'name');
            res.json({ laptops });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    getListarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findById(id).populate('holder', 'name');
            if (!laptop) return res.status(404).json({ error: "Laptop no encontrada" });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    postLaptop: async (req, res) => {
        try {
            const { holder, serial, qrcode } = req.body;
            const laptop = new Laptop({ holder, serial, qrcode });
            await laptop.save();
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putModificar: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const laptop = await Laptop.findByIdAndUpdate(id, updatedData, { new: true });
            if (!laptop) return res.status(404).json({ error: "Laptop no encontrada" });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findByIdAndUpdate(id, { state: 1 });
            if (!laptop) return res.status(404).json({ error: "Laptop no encontrada" });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findByIdAndUpdate(id, { state: 0 });
            if (!laptop) return res.status(404).json({ error: "Laptop no encontrada" });
            res.json({ laptop });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    generarQR: async (req, res) => {
        try {
            const { id } = req.params;
            const laptop = await Laptop.findById(id);
            if (!laptop) return res.status(404).json({ error: "Laptop no encontrada" });

            const qrData = `Serial: ${laptop.serial}, QRCode: ${laptop.qrcode}`;
            const qrCodeImage = await QRCode.toDataURL(qrData);

            res.json({ qrCode: qrCodeImage });
        } catch (error) {
            res.status(400).json({ error: "No se pudo generar el código QR" });
        }
    }
};

module.exports = laptopController;
