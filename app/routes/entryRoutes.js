const { Router } = require("express");
const { check } = require("express-validator");
const entryController = require("../controllers/entrycontroller");
const { helperEntry } = require("../helpers/entryhelpers"); 
const { validarCampos } = require("../middleware/validar-datos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

// POST: Crear nueva entrada
router.post("/", [
  validarJWT,
  check("laptop", "El ID de la laptop es obligatorio").isMongoId(),
  check("laptop", "La laptop debe existir en la BD").custom(helperEntry.validarLaptop),
  check("holder", "El ID del holder es obligatorio").isMongoId(),
  check("holder", "el Holder debe existir en la BD").custom(helperEntry.validarHolder),
  validarCampos
], entryController.postEntry);

// GET: Listar entradas por Holder
router.get("/holder/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperEntry.validarHolder), 
  validarCampos
], entryController.getListarPorHolder);

// GET: Listar entradas por día
router.get("/dia",[
  validarJWT,
  validarCampos
], entryController.getListarPorDia);

// GET: Listar entradas entre fechas
router.get("/fechas", [
  validarJWT,
  check("startDate", "La fecha de inicio es obligatoria").notEmpty(),
  check("endDate", "La fecha de fin es obligatoria").notEmpty(),
  validarCampos
], entryController.getListarEntreFechas);

// PUT: Registrar salida
router.put("/salida/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperEntry.validarId),
  validarCampos
], entryController.putRegistrarSalida);

module.exports = router;
