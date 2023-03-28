/*
    Event Routes
    /api/
*/
const { Router } = require('express')

const { validateFields } = require('../middlewares/validar-campos')
// const { validateJWT } = require('../middlewares/validar-jwt')
const { getReservations, getFindReservations, addReservations, updateReservations, deleteReservations } = require('../controllers/reservation.Controller')

const router = Router()

// Todas tienes que pasar por la validación del JWT
// router.use(validateJWT)

// Obtener
router.get('/', getReservations)
router.get('/:id', getFindReservations)

// Crear un nuevo
router.post(
  '/',
  [
    validateFields
  ],
  addReservations
)

// Actualizar
router.put(
  '/:id',
  [
    validateFields
  ],
  updateReservations
)

// Borrar
router.delete('/:id', deleteReservations)

module.exports = router
