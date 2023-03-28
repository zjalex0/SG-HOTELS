const express = require('express')
const cors = require('cors')
const { createServer } = require('http')

const { dbConnection } = require('./database')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.server = createServer(this.app)
    // this.io     = require('socket.io')(this.server)

    this.paths = {
      auth: '/api/auth',
      hotel: '/api/hotel',
      room: '/api/room',
      reservation: '/api/reservation'
      // usuarios:   '/api/usuarios',
      // uploads:    '/api/uploads',
    }

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes()

    // Sockets
    this.sockets()
  }

  async conectarDB () {
    await dbConnection()
  }

  middlewares () {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio Público
    this.app.use(express.static('public'))

    // Fileupload - Carga de archivos
    // this.app.use( fileUpload({
    //     useTempFiles : true,
    //     tempFileDir : '/tmp/',
    //     createParentPath: true
    // }));
  }

  routes () {
    this.app.use(this.paths.auth, require('../routes/auth.Route'))
    this.app.use(this.paths.hotel, require('../routes/hotels.Route'))
    this.app.use(this.paths.room, require('../routes/room.Route'))
    this.app.use(this.paths.reservation, require('../routes/reservation.Route'))
  }

  sockets () {
    // this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
  }

  listen () {
    this.server.listen(this.port, () => {
      console.clear()
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
