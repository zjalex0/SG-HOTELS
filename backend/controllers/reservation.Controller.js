const { response } = require('express')
const { ReservationModel, EmailVerified } = require('../models')
const NodemailerCtrl = require('./email.Controller')

const getReservations = async (req, res = response) => {
  try {
    const reservations = await ReservationModel.aggregate([
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'rooms'
        }
      }
    ])
    res.json(reservations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: true, message: error.message })
  }
}

const getFindReservations = async (req, res = response) => {
  try {
    const reservations = await ReservationModel.find()
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addReservations = async (req, res = response) => {
  const reservations = new ReservationModel(req.body)
  try {
    const reservationsave = await reservations.save()

    const emailM = new EmailVerified({
      to: reservationsave.guestEmail
    })
   // NodemailerCtrl.enviarEmail(emailM)

    res.json(reservationsave)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

const updateReservations = async (req, res = response) => {
  const reservationId = req.params.id

  try {
    const reservationFind = await ReservationModel.findById(reservationId)

    if (!reservationFind) {
      return res.status(404).json({ error: true, message: 'No se encontro registro con ese id' })
    }

    const newReservation = {
      ...req.body
    }

    const reservation = await ReservationModel.findByIdAndUpdate(reservationId, newReservation, { new: true })

    res.json(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

const deleteReservations = async (req, res = response) => {
  const reservationId = req.params.id

  try {
    const reservation = await ReservationModel.findById(reservationId)

    if (!reservation) {
      return res.status(404).json({
        error: true,
        message: 'Reservación no existe con ese id'
      })
    }

    await ReservationModel.findByIdAndDelete(reservationId)
    res.json(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  getReservations,
  getFindReservations,
  addReservations,
  updateReservations,
  deleteReservations
}
