const { response } = require('express')
const { UserModel } = require('../models')
const { generarJWT } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')

const addUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let usuario = await UserModel.findOne({ email })
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      })
    }

    usuario = new UserModel(req.body)

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)
    usuario.roles = 'user'

    await usuario.save()
    res.status(201).json({
      ...usuario,
      ok: true
      // token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const usuario = await UserModel.findOne({ email })

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        // msg: 'El usuario no existe con ese email'
        msg: 'El nombre de usuario o contraseña son incorrectos'
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        // msg: 'Password incorrecto'
        msg: 'El nombre de usuario o contraseña son incorrectos'
      })
    }

    const admin = usuario.roles === 'admin'
    // Generar JWT
    const token = await generarJWT(usuario._id, usuario.firstName, admin)

    res.json({
      ok: true,
      uid: usuario._id,
      firstName: usuario.firstName,
      admin,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const revalidateToken = async (req, res = response) => {
  const { uid, name, admin } = req
  // Generar JWT
  const token = await generarJWT(uid, name, admin)

  res.json({
    ok: true,
    token,
    uid,
    firstName: name,
    admin
  })
}

const getFindUser = async (req, res = response) => {
  try {
    const { id } = req.query
    const User = await UserModel.findById(id)

    res.json({
      typeDoc: User.typeDoc,
      ID: User.ID,
      firstName: User.firstName,
      lastName: User.lastName,
      email: User.email,
      phone: User.phone,
      emergencyContactName: User.emergencyContactName,
      emergencyContactPhone: User.emergencyContactPhone
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res = response) => {
  const id = req.params.id
  try {
    const userFind = await UserModel.findById(id)
    if (!userFind) {
      return res.status(404).json({ error: true, message: 'No se encontro registro con ese id' })
    }
    const newUser = {
      ...req.body
    }
    const user = await UserModel.findByIdAndUpdate(id, newUser, { new: true })

    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

module.exports = {
  addUser,
  loginUser,
  updateUser,
  getFindUser,
  revalidateToken
}
