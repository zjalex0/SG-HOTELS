const { response } = require('express')
const { HotelModel } = require('../models')

const getHotels = async (req, res = response) => {
  try {
    const hotels = await HotelModel.find()
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
}

const getFindHotels = async (req, res = response) => {
  try {
    const hotels = await HotelModel.find()
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addHotels = async (req, res = response) => {
  const hotels = new HotelModel(req.body)
  try {
    const hotelsave = await hotels.save()

    res.json(hotelsave)
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

const updateHotels = async (req, res = response) => {
  const hotelId = req.params.id

  try {
    const hotelFind = await HotelModel.findById(hotelId)

    if (!hotelFind) {
      return res.status(404).json({ error: true, message: 'No se encontro registro con ese id' })
    }

    const newHotel = {
      ...req.body
    }

    const hotel = await HotelModel.findByIdAndUpdate(hotelId, newHotel, { new: true })

    res.json(hotel)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

const deleteHotels = async (req, res = response) => {
  const hotelId = req.params.id

  try {
    const hotel = await HotelModel.findById(hotelId)

    if (!hotel) {
      return res.status(404).json({
        error: true,
        message: 'Hotel no existe con ese id'
      })
    }

    await HotelModel.findByIdAndDelete(hotelId)
    res.json(hotel)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  getHotels,
  getFindHotels,
  addHotels,
  updateHotels,
  deleteHotels
}
