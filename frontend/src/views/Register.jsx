import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore, useForm } from 'src/hooks'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'

const Register = () => {
  const { errorMessage, isRegister, startRegister } = useAuthStore()

  const [formState, onChangeForm, onResetForm] = useForm({
    _id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
  })

  const { firstName, lastName, phone, email, password, password2 } = formState

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
    }
    startRegister(formState)
  }

  useEffect(() => {
    isRegister && onResetForm()
  }, [isRegister])

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Registro</h1>
                  <p className="text-medium-emphasis">Crea tu cuenta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="Nombre" name="firstName" value={firstName} onChange={onChangeForm} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="Apellidos" name="lastName" value={lastName} onChange={onChangeForm} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput type="number" placeholder="Teléfono" name="phone" value={phone} onChange={onChangeForm} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" name="email" autoComplete="off" value={email} onChange={onChangeForm} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Contraseña" name="password" autoComplete="off" value={password} onChange={onChangeForm} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Repetir contraseña" name="password2" autoComplete="off" value={password2} onChange={onChangeForm} />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Crear cuenta
                    </CButton>
                    <CRow className="mt-5 row justify-content-md-center">
                      <CCol md="auto">
                        <p className="text-medium-emphasis">Ya tengo cuenta</p>
                      </CCol>
                      <NavLink to="/login">
                        <CButton color="secondary" className="w-100" active tabIndex={-1}>
                          Iniciar sesion
                        </CButton>
                      </NavLink>
                    </CRow>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
