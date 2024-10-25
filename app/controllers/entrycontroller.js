const Entry = require('../models/entry');

const entryController = {
    postEntry: async (req, res) => {
        try {
            const { laptop, entrytime, checkout, type } = req.body;
            const entry = new Entry({ laptop, entrytime, checkout, type });
            await entry.save();
            res.json({ entry });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    getListarPorHolder: async (req, res) => {
        try {
            const { id } = req.params;
            const entries = await Entry.find({ laptop: id }).populate('laptop');
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    getListarPorDia: async (req, res) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const entries = await Entry.find({ entrytime: { $gte: new Date(today) } });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    getListarEntreFechas: async (req, res) => {
        try {
            const { start, end } = req.query;
            const entries = await Entry.find({
                entrytime: { $gte: new Date(start), $lte: new Date(end) }
            });
            res.json({ entries });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    },

    putRegistrarSalida: async (req, res) => {
        try {
            const { id } = req.params;
            const entry = await Entry.findByIdAndUpdate(id, { checkout: new Date() }, { new: true });
            if (!entry) return res.status(404).json({ error: "Entrada no encontrada" });
            res.json({ entry });
        } catch (error) {
            res.status(400).json({ error: "No se pudo realizar la operación" });
        }
    }
};

module.exports = entryController;
