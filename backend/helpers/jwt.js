const jwt = require('jsonwebtoken')

const generarJWT = (uid, name, admin) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, admin }

    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        // reject('No se pudo generar el token')
        reject(err)
      }

      resolve(token)
    })
  })
}

module.exports = {
  generarJWT
}
