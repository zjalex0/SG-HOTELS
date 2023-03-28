import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore, useForm } from 'src/hooks'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'

const Login = () => {
  const { startLogin, errorMessage } = useAuthStore()

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
    // lEmail: 'example@gmail.com',
    // lPassword: '123456',
  })

  const { lEmail, lPassword } = formLoginValues

  const handleLogin = (e) => {
    e.preventDefault()
    startLogin({ email: lEmail, password: lPassword })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <CRow>
                      <div className="row justify-content-md-center">
                        <CCol md="auto mb-3">Iniciar Sessión</CCol>
                      </div>
                    </CRow>
                    <p className="text-medium-emphasis">Dirección de correo electrónico</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="email" autoComplete="email" name="lEmail" value={lEmail} onChange={handleLoginInputChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" name="lPassword" value={lPassword} onChange={handleLoginInputChange} />
                    </CInputGroup>
                    <CRow>
                      <CButton type="submit" color="primary" className="m-2">
                        <strong>Aceptar</strong>
                      </CButton>
                    </CRow>
                    <CRow className="mt-3 row justify-content-md-center">
                      <CCol md="auto">
                        <p className="text-medium-emphasis">¿Eres nuevo?</p>
                      </CCol>
                      <NavLink to="/register">
                        <CButton color="secondary" className="w-100" active tabIndex={-1}>
                          Crear cuenta
                        </CButton>
                      </NavLink>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
