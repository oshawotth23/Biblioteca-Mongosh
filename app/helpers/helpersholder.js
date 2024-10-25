const Holder = require("../models/Holder");

const helperHolder = {
  validarEmail: async (email = '') => {
   
    const existe = await Holder.findOne({ email });
    if (existe) {
      throw new Error(`El email ${email} ya está registrado`);
    }
  },

  validarId: async (id) => {
    
    const existe = await Holder.findById(id);
    if (!existe) {
      throw new Error(`El ID ${id} no existe`);
    }
  },



  validarDocumento: async (document = '') => {
   
    const existe = await Holder.findOne({ document });
    if (existe) {
      throw new Error(`El documento ${document} ya está registrado`);
    }
  },

  validarFicha: (ficha = '') => {
    
    if (isNaN(ficha)) {
      throw new Error("La ficha debe ser un número válido");
    }
  }
};

module.exports = { helperHolder };
