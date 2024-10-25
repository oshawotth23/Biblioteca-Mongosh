const Entry = require("../models/Entry"); 
const Laptop = require("../models/Laptop");
const Holder = require("../models/Holder");

const helperEntry = {
  validarId: async (id) => {
    const existe = await Entry.findById(id);
    if (!existe) {
      throw new Error("El ID no existe en la BD");
    }
  },
  validarLaptop: async (laptopId) => {
    const existe = await Laptop.findById(laptopId);
    if (!existe) {
      throw new Error("La laptop no existe en la BD");
    }
  },
  validarHolder: async (holderId) => {
    const existe = await Holder.findById(holderId);
    if (!existe) {
      throw new Error("El holder no existe en la BD");
    }
  }
};

module.exports = { helperEntry };
