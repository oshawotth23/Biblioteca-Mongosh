const { Router } = require("express");
const { check } = require("express-validator");
const laptopController = require("../controllers/laptopcontroller");
const { helperLaptop } = require("../helpers/helperslaptop"); 
const { validarCampos } = require("../middleware/validar-datos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

// GET: Listar todas las laptops
router.get("/", [
  validarJWT,
  validarCampos
], laptopController.getListarTodos);

// GET: Listar laptop por ID
router.get("/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperLaptop.validarId),
  validarCampos
], laptopController.getListarPorId);

// POST: Crear nueva laptop
router.post("/", [
 validarJWT,
  check("holder", "El holder es obligatorio").isMongoId(),
  check("serial", "El número de serie es obligatorio").notEmpty(),
  check("qrcode", "El código QR es obligatorio").notEmpty(),
  check("qrcode", "El código QR debe ser único").custom(helperLaptop.validarQrCode),
  validarCampos
], laptopController.postLaptop);

// PUT: Modificar laptop
router.put("/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperLaptop.validarId),
  check("serial", "El número de serie es obligatorio").optional().notEmpty(),
  check("qrcode", "El código QR debe ser único").optional().custom(helperLaptop.validarQrCode),
  validarCampos
], laptopController.putModificar);

// PUT: Activar laptop
router.put("/activate/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperLaptop.validarId),
  validarCampos
], laptopController.putActivar);

// PUT: Inactivar laptop
router.put("/unactivate/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperLaptop.validarId),
  validarCampos
], laptopController.putInactivar);

// PUT: Generar código QR
router.put("/qr/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperLaptop.validarId),
  validarCampos
], laptopController.generarQR);

module.exports = router;
