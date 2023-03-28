const { response } = require('express')
const { RoomModel, ReservationModel } = require('../models')

const getRooms = async (req, res = response) => {
  try {
    const rooms = await RoomModel.aggregate([
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'rooms'
        }
      }
    ])
    res.json(rooms)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: true, message: error.message })
  }
}

const getFindRooms = async (req, res = response) => {
  try {
    const { hotel } = req.query;
    
    if (!!hotel) {
      const rooms = await RoomModel.find({ hotel })
      res.json(rooms)
      return
    }
    getFilterRoomsReservations(req, res)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

const getFilterRoomsReservations = async (req, res = response) => {
  try {
    let obj = {}
    const { checkInDate, checkOutDate, ...othres } = req.query;

    if (othres) {
      const keys = Object.keys(othres)[0]
      if (typeof (othres[keys]) === 'string') {
        obj = { [keys]: { $regex: new RegExp('.*' + othres[keys] + '.*', 'gi') } }
      } else {
        obj = othres
      }
    } else {
      obj = othres
    }

    const rooms = await RoomModel.find({
      ...obj,
      active: true,
      _id: {
        $nin: await ReservationModel.distinct('room', {
          $or: [
            { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } },
            { checkInDate: { $lte: checkInDate }, checkOutDate: { $gte: checkOutDate } },
            { checkInDate: { $gte: checkInDate }, checkOutDate: { $lte: checkOutDate } },
          ],
        })
      }
    });

    res.json(rooms)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}


const addRooms = async (req, res = response) => {
  const rooms = new RoomModel(req.body)
  try {
    const roomsave = await rooms.save()

    res.json(roomsave)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

const updateRooms = async (req, res = response) => {
  const roomId = req.params.id
  try {
    const roomFind = await RoomModel.findById(roomId)
    if (!roomFind) {
      return res.status(404).json({ error: true, message: 'No se encontro registro con ese id' })
    }
    const newRoom = {
      ...req.body
    }
    const room = await RoomModel.findByIdAndUpdate(roomId, newRoom, { new: true })

    res.json(room)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: 'Hable con el administrador'
    })
  }
}

const deleteRooms = async (req, res = response) => {
  const roomId = req.params.id

  try {
    const room = await RoomModel.findById(roomId)

    if (!room) {
      return res.status(404).json({
        error: true,
        message: 'Habitación no existe con ese id'
      })
    }

    await RoomModel.findByIdAndDelete(roomId)
    res.json(room)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  getRooms,
  getFindRooms,
  getFilterRoomsReservations,
  addRooms,
  updateRooms,
  deleteRooms
}
