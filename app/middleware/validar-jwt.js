const jwt=require("jsonwebtoken")
const Holder=require("../models/Holder")


const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "300h", 
      },
      (err, token) => {
        if (err) {
         
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validarJWT = (req, res, next) => {
  const token = req.header("x-token");  

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
    let holder = Holder.findById(id);
    if (!holder) {
      return res.status(401).json({ msg: "Token no valido" });
    }
    if(holder.state===0){
        return res.status(401).json({ msg: "Holder inactivo" });
    }
    req.holder = holder;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = {
  generarJWT,
  validarJWT,
};
    
    
