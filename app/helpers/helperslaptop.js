const Laptop = require("../models/Laptop");

const helperLaptop = {
  validarId: async (id) => {
    const existe = await Laptop.findById(id);
    if (!existe) {
      throw new Error("El ID no existe en la BD");
    }
  },
  validarQrCode: async (qrcode) => {
    const existe = await Laptop.findOne({ qrcode });
    if (existe) {
      throw new Error("El código QR ya está registrado");
    }
  }
};

module.exports = { helperLaptop };
