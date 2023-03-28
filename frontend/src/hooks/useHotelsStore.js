import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { api_axios } from 'src/api'
import { onSetActiveHotel, onAddNewHotel, onUpdateHotel, onDeleteHotel, onLoadHotel } from '../store'

export const useHotelsStore = () => {
  const dispatch = useDispatch()
  const { hotels, activeHotel } = useSelector((state) => state.hotel)
  const { user } = useSelector((state) => state.auth)

  const setActiveHotel = (hotel) => {
    dispatch(onSetActiveHotel(hotel))
  }

  const startSavingHotel = async (hotel) => {
    try {
      if (hotel._id) {
        // Actualizando
        await api_axios.put(`/hotel/${hotel._id}`, hotel)
        dispatch(onUpdateHotel({ ...hotel, user }))
        return
      }

      // Creando
      const { data } = await api_axios.post('/hotel', hotel)
      dispatch(onAddNewHotel({ ...hotel, _id: data._id, user }))
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
      })
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingHotel = async (hotel) => {
    // Todo: Llegar al backend
    try {
      await api_axios.delete(`/hotel/${hotel._id}`)
      dispatch(onDeleteHotel(hotel))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }
  }

  const startLoadingHotels = async () => {
    try {
      const { data } = await api_axios.get('/hotel')
      dispatch(onLoadHotel(data))
    } catch (error) {
      console.log('Error cargando hoteles')
      console.log(error)
    }
  }

  return {
    //* Propiedades
    activeHotel,
    hotels: hotels || [],
    hasHotelSelected: !!activeHotel,

    //* Métodos
    setActiveHotel,
    startDeletingHotel,
    startLoadingHotels,
    startSavingHotel,
  }
}
