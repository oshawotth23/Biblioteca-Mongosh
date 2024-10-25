const { Router } = require("express");
const { check } = require("express-validator");
const httpHolder = require("../controllers/holdercontroller");

const { helperHolder } = require("../helpers/helpersholder");
const { validarCampos } = require("../middleware/validar-datos");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

// GET: Listar todos
router.get("/",[
  validarJWT,
  validarCampos
], httpHolder.getListarTodos);

// GET: Listar por ID
router.get("/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperHolder.validarId),
  validarCampos
], httpHolder.getListarPorId);

// POST: Crear nuevo Holder
router.post("/", [
  
  check("email", "El email es obligatorio").notEmpty(),
  check("email", "El email debe ser único").custom(helperHolder.validarEmail),
  check("password", "La contraseña es obligatoria").notEmpty(),
  check("name"," El nombre debe ser obligatorio").notEmpty(),
  check("rol","El rol es obligatirio").notEmpty(),
  check("password", "Mínimo 8 caracteres").isLength({ min: 8 }),
  check("document", "El documento es obligatorio").notEmpty(),
  check("document","El documento debe ser unico").custom(helperHolder.validarDocumento),
  check("ficha", "Ficha debe ser un número").isNumeric(),
  validarCampos
], httpHolder.postHolder);

// PUT: Modificar Holder
router.put("/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperHolder.validarId),
  check("email", "El email es obligatorio").optional().notEmpty(),
  check("email", "El email debe ser único").optional().custom(helperHolder.validarEmail),
  check("password", "La contraseña debe tener mínimo 8 caracteres").optional().isLength({ min: 8 }),
  validarCampos
], httpHolder.putModificar);

// PUT: Activar Holder
router.put("/activate/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperHolder.validarId),
  validarCampos
], httpHolder.putActivar);

// PUT: Inactivar Holder
router.put("/unactivate/:id", [
  validarJWT,
  check("id", "Id no válido").isMongoId(),
  check("id", "No existe en la BD").custom(helperHolder.validarId),
  validarCampos
], httpHolder.putInactivar);


router.post("/login", [
  
  check("email", "El email es obligatorio").notEmpty(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  validarCampos
] , httpHolder.postlogin);



module.exports = router;
