/*
    Event Routes
*/
const { Router } = require('express')

const { validateFields } = require('../middlewares/validar-campos')
// const { validateJWT } = require('../middlewares/validar-jwt')
const { getRooms, getFindRooms, addRooms, updateRooms, deleteRooms } = require('../controllers/room.Controller')

const router = Router()

// Todas tienes que pasar por la validación del JWT
// router.use(validateJWT)

// Obtener
router.get('/', getRooms)
router.get('/:id', getFindRooms)

// Crear un nuevo
router.post(
  '/',
  [
    validateFields
  ],
  addRooms
)

// Actualizar
router.put(
  '/:id',
  [
    validateFields
  ],
  updateRooms
)

// Borrar
router.delete('/:id', deleteRooms)

module.exports = router
