/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { validateFields } = require('../middlewares/validar-campos')
const { addUser, loginUser, updateUser, getFindUser, revalidateToken } = require('../controllers/auth.Controller')
const { validateJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post(
  '/new',
  [ // middlewares
    validateFields
  ],
  addUser
)

router.post(
  '/',
  [
    validateFields
  ],
  loginUser
)

router.put('/:id', updateUser)
router.get('/', getFindUser)
router.get('/renew', validateJWT, revalidateToken)

module.exports = router
