import { useDispatch, useSelector } from 'react-redux'
import { api_axios } from 'src/api'
import Swal from 'sweetalert2'
import { clearErrorMessage, onSetRegister, onSetUserInfo, onChecking, onLogin, onLogout } from '../store'

export const useAuthStore = () => {
  const { status, user, userInfo, isRegister, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await api_axios.post('/auth', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ firstName: data.firstName, uid: data.uid, admin: data.admin }))
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async (user) => {
    try {
      const { data } = await api_axios.post('/auth/new', user)
      if (data.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
        })
        dispatch(onSetRegister(true))
      }
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || '--'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = await api_axios.get('auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ firstName: data.firstName, uid: data.uid, admin: data.admin }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  const startFindUser = async (id) => {
    try {
      const { data } = await api_axios.get(`/auth`, { params: { id } })
      dispatch(onSetUserInfo(data))
    } catch (error) {
      console.log('Error')
      console.log(error)
    }
  }

  const startSavingUser = async (user) => {
    try {
      if (user._id) {
        // Actualizando
        await api_axios.put(`/auth/${user._id}`, user)
        dispatch(onSetUserInfo({ ...user }))
        return
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  return {
    //* Propiedades
    errorMessage,
    isRegister,
    status,
    userInfo,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startFindUser,
    startSavingUser,
    startRegister,
  }
}
