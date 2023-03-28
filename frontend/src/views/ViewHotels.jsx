import { cilPencil, cilTrash, cilStar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CFormLabel, CImage, CInputGroup, CFormSwitch, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CAvatar, CFormRange } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import AppRooms from 'src/components/AppRooms'
import { useHotelsStore } from 'src/hooks'
import { useForm } from 'src/hooks/useForm'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

const ViewHotels = () => {
  const { hotels, activeHotel, startLoadingHotels, startDeletingHotel, startSavingHotel, setActiveHotel } = useHotelsStore()

  const imagenDefault = 'https://www.goodyearhealth.com/wp-content/uploads/350x300.png'
  const [visibleRegister, setVisibleRegister] = useState(false)
  const [validated, setValidated] = useState(false)
  const [formState, onChangeForm, onResetForm, onLoaderForm] = useForm({
    _id: undefined,
    name: '',
    image: '',
    country: '',
    city: '',
    street: '',
    parking: false,
    roomsJson: [],
    active: false,
  })
  const { _id, name, image, country, city, street, website, email, phone, stars, active } = formState

  const handle_Cancel = () => {
    Swal.fire({
      title: '¿Desea regresar y descartar los cambios?',
      showDenyButton: true,
      icon: 'question',
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        onResetForm()
        setVisibleRegister(false)
        setValidated(false)
      }
    })
  }

  const handle_Save = (e) => {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        showDenyButton: true,
        icon: 'question',
        confirmButtonText: 'Continuar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          startSavingHotel({ ...formState, address: { country, city, street }, stars: parseInt(stars) })
          onResetForm()
          setVisibleRegister(false)
          setValidated(false)
        }
      })
    }
    setValidated(true)
  }

  const handle_LoadUpdate = (hotel) => {
    setVisibleRegister(true)
    setValidated(false)
    onLoaderForm({ ...hotel, ...hotel.address })
  }

  const handle_Delete = (hotel) => {
    Swal.fire({
      title: '¿Desea eliminar este registro?',
      showDenyButton: true,
      icon: 'question',
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingHotel(hotel)
      }
    })
  }

  useEffect(() => {
    startLoadingHotels()
  }, [])

  useEffect(() => {
    if (!!activeHotel && Object.keys(activeHotel).length) {
      handle_LoadUpdate(activeHotel)
      setActiveHotel({})
    }
  }, [activeHotel])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h4 className="card-title mb-3">HOTELES</h4>
          </CCol>
        </CRow>
        <CContainer fluid>
          <CCard className="mb-4">
            <CCardHeader>
              {!visibleRegister ? (
                <CButton className="float-start" shape="rounded-pill" onClick={() => setVisibleRegister(true)}>
                  <strong>+ Agregar</strong>
                </CButton>
              ) : (
                <h5>Editar</h5>
              )}
            </CCardHeader>
            <CCardBody>
              {!visibleRegister ? (
                <CContainer fluid>
                  <CRow>
                    <CCol xs={12}>
                      <CTable align="middle" responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Estrellas</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Teléfono</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Dirección</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Activo</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {hotels.map((item, index) => (
                            <CTableRow key={uuidv4()}>
                              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                              <CTableDataCell>{item.name}</CTableDataCell>
                              <CTableDataCell>
                                <CAvatar size="md" src={item.image} />
                              </CTableDataCell>
                              <CTableDataCell>
                                {[...Array(item.stars || 0)].map((_, i) => (
                                  <CIcon key={i} icon={cilStar} size="lg" />
                                ))}
                              </CTableDataCell>
                              <CTableDataCell>{item.email}</CTableDataCell>
                              <CTableDataCell>{item.phone}</CTableDataCell>
                              <CTableDataCell>{`${item?.address?.country}, ${item?.address?.city} - ${item?.address?.street}`}</CTableDataCell>
                              <CTableDataCell>
                                <CFormSwitch disabled checked={item.active} />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton color="info" variant="outline" className="me-1" onClick={() => handle_LoadUpdate(item)}>
                                  <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" variant="outline" onClick={() => handle_Delete(item)}>
                                  <CIcon icon={cilTrash} />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CContainer>
              ) : (
                <>
                  <CForm className="row g-3" noValidate validated={validated} onSubmit={handle_Save}>
                    <CCol xs={3}>
                      <CCard className="p-2">
                        <CImage rounded thumbnail src={image || imagenDefault} />
                        <CCardBody>
                          <CFormLabel>Ruta de imagen</CFormLabel>
                          <CInputGroup className="mb-3">
                            <CFormInput id="basic-url" name="image" value={image} onChange={onChangeForm} aria-describedby="basic-addon3" />
                          </CInputGroup>
                        </CCardBody>
                      </CCard>
                    </CCol>

                    <CCol xs={9}>
                      <CCol xs={12}>
                        <CFormLabel>Nombre</CFormLabel>
                        <CFormInput type="text" name="name" value={name} onChange={onChangeForm} feedbackinvalid="Requerido" required />
                      </CCol>
                      <br />
                      <CFormLabel>Ubicación</CFormLabel>
                      <CRow>
                        <CCol xs={4}>
                          <CFormLabel>Pais</CFormLabel>
                          <CFormInput name="country" value={country} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                        </CCol>
                        <CCol xs={4}>
                          <CFormLabel>Ciudad</CFormLabel>
                          <CFormInput name="city" value={city} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                        </CCol>
                        <CCol xs={4}>
                          <CFormLabel>Calle</CFormLabel>
                          <CFormInput name="street" value={street} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                        </CCol>
                      </CRow>
                      <br />
                      <CRow>
                        <CCol xs={4}>
                          <CFormLabel>Sitio web</CFormLabel>
                          <CFormInput name="website" value={website} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                        </CCol>
                        <CCol xs={4}>
                          <CFormLabel>Correo</CFormLabel>
                          <CFormInput name="email" value={email} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                        </CCol>
                        <CCol xs={4}>
                          <CFormLabel>Teléfono</CFormLabel>
                          <CFormInput name="phone" value={phone} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                        </CCol>
                      </CRow>
                      <br />
                      <CRow>
                        <CCol xs={2}>
                          <CFormLabel>Estrellas</CFormLabel>
                          <br />
                          {[...Array(parseInt(stars) || 1)].map((_, i) => (
                            <CIcon key={i} icon={cilStar} size="lg" />
                          ))}
                          <CFormRange name="stars" min={1} max={5} defaultValue={stars || 1} onChange={onChangeForm} />
                        </CCol>
                        <CCol xs={6}>
                          <CFormSwitch label="Activo" name="active" onChange={onChangeForm} checked={active} />
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="danger" className="float-end ms-2" onClick={handle_Cancel}>
                        Cancelar
                      </CButton>
                      <CButton color="success" className="float-end" type="submit">
                        Guardar
                      </CButton>
                    </CCol>
                  </CForm>

                  <br />
                  <h3>Habitaciones</h3>
                  <AppRooms idHotel={_id} />
                </>
              )}
            </CCardBody>
          </CCard>
        </CContainer>
      </CCardBody>
    </CCard>
  )
}
ViewHotels.propTypes = {}

export default ViewHotels
