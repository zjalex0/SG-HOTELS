/*
    Event Routes
    /api/
*/
const { Router } = require('express')

const { validateFields } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/validar-jwt')
const { getHotels, getFindHotels, addHotels, updateHotels, deleteHotels } = require('../controllers/hotels.Controller')

const router = Router()

// Todas tienes que pasar por la validación del JWT
router.use(validateJWT)

// Obtener
router.get('/', getHotels)
router.get('/:id', getFindHotels)

// Crear un nuevo
router.post(
  '/',
  [
    validateFields
  ],
  addHotels
)

// Actualizar
router.put(
  '/:id',
  [
    validateFields
  ],
  updateHotels
)

// Borrar
router.delete('/:id', deleteHotels)

module.exports = router
