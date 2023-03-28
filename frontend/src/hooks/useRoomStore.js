import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { api_axios } from 'src/api'
import { onSetActiveRoom, onAddNewRoom, onUpdateRoom, onDeleteRoom, onLoadRoom } from '../store'

export const useRoomStore = () => {
  const dispatch = useDispatch()
  const { rooms, activeRoom } = useSelector((state) => state.room)
  const { user } = useSelector((state) => state.auth)

  const setActiveRoom = (room) => {
    dispatch(onSetActiveRoom(room))
  }

  const startSavingRoom = async (room) => {
    try {
      if (room._id) {
        // Actualizando
        await api_axios.put(`/room/${room._id}`, room)
        dispatch(onUpdateRoom({ ...room, user }))
        return
      }

      // Creando
      const { data } = await api_axios.post('/room', room)
      dispatch(onAddNewRoom({ ...room, _id: data._id, user }))
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
      })
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingRoom = async (room) => {
    // Todo: Llegar al backend
    try {
      await api_axios.delete(`/room/${room._id}`)
      dispatch(onDeleteRoom(room))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }
  }

  const startLoadingRooms = async () => {
    try {
      const { data } = await api_axios.get('/room')
      dispatch(onLoadRoom(data))
    } catch (error) {
      console.log('Error cargando habitaciones')
      console.log(error)
    }
  }

  const startFilterRooms = async (json) => {
    try {
      const { data } = await api_axios.get(`/room/${json._id}`, { params: json || {} })
      dispatch(onLoadRoom(data))
    } catch (error) {
      console.log('Error cargando habitaciones', error)
    }
  }

  const startFindRooms = async (_id) => {
    try {
      const { data } = await api_axios.get(`/room/${_id}`, { params: { _id } })
      dispatch(onLoadRoom(data))
    } catch (error) {
      console.log('Error cargando habitaciones')
      console.log(error)
    }
  }

  const startFindRoomsHotel = async (_id) => {
    try {
      const { data } = await api_axios.get(`/room/${_id}`, { params: { hotel: _id } })
      dispatch(onLoadRoom(data))
    } catch (error) {
      console.log('Error cargando habitaciones')
      console.log(error)
    }
  }

  return {
    //* Propiedades
    activeRoom,
    rooms: rooms || [],
    hasRoomSelected: !!activeRoom,

    //* Métodos
    setActiveRoom,
    startFindRooms,
    startFilterRooms,
    startFindRoomsHotel,
    startDeletingRoom,
    startLoadingRooms,
    startSavingRoom,
  }
}
