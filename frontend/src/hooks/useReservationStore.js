import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { api_axios } from 'src/api'
import { onSetActiveReservation, onAddNewReservation, onUpdateReservation, onDeleteReservation, onLoadReservation } from '../store'

export const useReservationStore = () => {
  const dispatch = useDispatch()
  const { reservations, activeReservation } = useSelector((state) => state.reservation)
  const { user } = useSelector((state) => state.auth)

  const setActiveReservation = (reservation) => {
    dispatch(onSetActiveReservation(reservation))
  }

  const startSavingReservation = async (reservation) => {
    try {
      if (reservation._id) {
        // Actualizando
        await api_axios.put(`/reservation/${reservation._id}`, reservation)
        dispatch(onUpdateReservation({ ...reservation, user }))
        return
      }

      // Creando
      const { data } = await api_axios.post('/reservation', reservation)
      dispatch(onAddNewReservation({ ...reservation, _id: data._id, user }))
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
      })
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingReservation = async (reservation) => {
    // Todo: Llegar al backend
    try {
      await api_axios.delete(`/reservation/${reservation._id}`)
      dispatch(onDeleteReservation(reservation))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al eliminar', error.response.data.msg, 'error')
    }
  }

  const startLoadingReservations = async () => {
    try {
      const { data } = await api_axios.get('/reservation')
      dispatch(onLoadReservation(data))
    } catch (error) {
      console.log('Error cargando las reservas')
      console.log(error)
    }
  }

  return {
    //* Propiedades
    activeReservation,
    reservations: reservations || [],
    hasReservationSelected: !!activeReservation,

    //* Métodos
    setActiveReservation,
    startDeletingReservation,
    startLoadingReservations,
    startSavingReservation,
  }
}
