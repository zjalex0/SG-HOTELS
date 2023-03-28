import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { cilStar, cilMagnifyingGlass, cilSearch } from '@coreui/icons'
import { CRow, CContainer, CCard, CCardHeader, CCardBody, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CAvatar, CFormSwitch, CButton, CFormLabel, CFormInput, CFormSelect, CFormRange, CModal, CModalHeader, CModalTitle, CModalBody, CForm } from '@coreui/react'
import { useAuthStore, useForm, useHotelsStore, useReservationStore, useRoomStore } from 'src/hooks'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import 'moment/locale/es'
import { AppDatePicker } from 'src/components'
import Swal from 'sweetalert2'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, userInfo, startFindUser, startSavingUser } = useAuthStore()
  const { hotels = [], startLoadingHotels, setActiveHotel } = useHotelsStore()
  const { reservations = [], startLoadingReservations, setActiveReservation, startSavingReservation } = useReservationStore()
  const { rooms, startFilterRooms } = useRoomStore()
  const today = new Date()
  const [visibleModal, setVisibleModal] = useState(false)
  const [validated, setValidated] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)

  const [formState, onChangeForm, onResetForm] = useForm({
    checkInDate: new Date(),
    checkOutDate: new Date(today.setDate(today.getDate() + 1)),
    search: '',
    filter: '',
    range: 100000,
  })
  const { checkInDate, checkOutDate, search, filter, range } = formState

  const [formStateUserInfo, onChangeFormUserInfo, onResetFormUserInfo, onLoaderFormUserInfo] = useForm({
    typeDoc: '',
    ID: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  })
  const { typeDoc, ID, firstName, lastName, phone, email, emergencyContactName, emergencyContactPhone } = formStateUserInfo

  useEffect(() => {
    user.admin && startLoadingHotels()
    user.admin && startLoadingReservations()
    !user.admin && handle_Search()
    startFindUser(user.uid)
  }, [])

  const handle_Search = () => {
    const obj = { checkInDate, checkOutDate, [filter]: filter === 'price' ? { $gte: 0, $lte: parseInt(range) } : search }
    startFilterRooms(obj)
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
          startSavingUser({ ...formStateUserInfo, _id: user.uid })
          startSavingReservation({
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomType: currentRoom.type,
            guestTypeDoc: typeDoc,
            guestName: firstName + lastName,
            guestEmail: email,
            guestPhone: phone,
            totalPrice: getTotalPrice(),
            paid: false,
            room: currentRoom._id,
            emergencyContactName: emergencyContactName,
            emergencyContactPhone: emergencyContactPhone,
            state: '',
            confirm: false,
          })
          handle_Search()
          setVisibleModal(false)
          onResetFormUserInfo()
        }
      })
    }
  }

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
        setValidated(false)
        setVisibleModal(false)
      }
    })
  }

  const getDifferenceDay = () => {
    if (!checkOutDate || !checkInDate) {
      return -1
    }
    let difference = checkOutDate.getTime() - checkInDate.getTime()
    return Math.ceil(difference / (1000 * 3600 * 24))
  }

  const getTotalPrice = () => {
    const difference = getDifferenceDay()
    return difference <= 0 ? currentRoom?.price || 0 : difference * (currentRoom?.price || 0)
  }

  return (
    <>
      <CContainer lg>
        {user.admin ? (
          <>
            <CCard className="mb-2 my-3">
              <CCardHeader>
                <h2>
                  <strong>RESERVAS</strong>
                </h2>
              </CCardHeader>
              <CCardBody color="info">
                <CRow>
                  <CCol xs={12}>
                    <CTable align="middle" responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Fecha de entrada</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Fecha de salida</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Habitación/Tipo</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {reservations.map((item, index) => (
                          <CTableRow key={uuidv4()}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{moment(item.checkInDate).format('LL')}</CTableDataCell>
                            <CTableDataCell>{moment(item.checkOutDate).format('LL')}</CTableDataCell>
                            <CTableDataCell>
                              {item.guestName}, <b>Tel:</b> {item.guestPhone}
                              <br />
                              <b>Email:</b> {item.guestEmail}
                            </CTableDataCell>
                            <CTableDataCell>
                              {item.rooms[0].roomNumber} - {item.rooms[0].type}
                            </CTableDataCell>
                            <CTableDataCell>$ {item.totalPrice || item.rooms[0].price} </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                color="info"
                                variant="outline"
                                className="me-1"
                                title="Ver más"
                                onClick={() => {
                                  setActiveReservation(item)
                                  navigate('/bookings')
                                }}
                              >
                                <CIcon icon={cilMagnifyingGlass} />
                              </CButton>
                              {/* {!item.state && (
                                <>
                                  <CButton color="success" variant="outline" className="me-1" title="Confirmar">
                                    <CIcon icon={cilCheckAlt} />
                                  </CButton>
                                  <CButton color="danger" variant="outline" title="Cancelar">
                                    <CIcon icon={cilXCircle} />
                                  </CButton>
                                </>
                              )} */}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard className="mb-2 my-3">
              <CCardHeader>
                <h2>
                  <strong>HOTELES</strong>
                </h2>
              </CCardHeader>
              <CCardBody color="info">
                <CRow>
                  <CCol xs={12}>
                    <CTable align="middle" responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Imagen</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Estrellas</CTableHeaderCell>
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
                              <CAvatar size="xl" src={item.image} />
                            </CTableDataCell>
                            <CTableDataCell>
                              {[...Array(item.stars || 0)].map((_, i) => (
                                <CIcon key={i} icon={cilStar} size="lg" />
                              ))}
                            </CTableDataCell>
                            <CTableDataCell>{`${item?.address?.country}, ${item?.address?.city} - ${item?.address?.street}`}</CTableDataCell>
                            <CTableDataCell>
                              <CFormSwitch disabled checked={item.active} />
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                color="info"
                                variant="outline"
                                className="me-1"
                                onClick={() => {
                                  setActiveHotel(item)
                                  navigate('/hotels')
                                }}
                              >
                                <CIcon icon={cilMagnifyingGlass} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </>
        ) : (
          <CCard className="mb-2 my-3">
            <CCardHeader>
              <h2>
                <strong>RESERVAR</strong>
              </h2>
            </CCardHeader>
            <CCardBody color="info">
              <CRow className="align-items-center">
                <CCol xs={3}>
                  <CFormLabel>Fecha de entrada</CFormLabel>
                  <AppDatePicker name="checkInDate" value={checkInDate} onChange={onChangeForm} />
                </CCol>
                <CCol xs={3}>
                  <CFormLabel>Fecha de salida</CFormLabel>
                  <AppDatePicker name="checkOutDate" value={checkOutDate} onChange={onChangeForm} />
                </CCol>
                <CCol>
                  <CFormLabel>Filtrar</CFormLabel>
                  <CFormSelect name="filter" value={filter} onChange={onChangeForm}>
                    <option value="type">Tipo</option>
                    <option value="description">Descripción</option>
                    <option value="amenities">Comodidades</option>
                    <option value="price">Precio</option>
                  </CFormSelect>
                </CCol>
                <CCol>
                  {filter !== 'price' ? (
                    <>
                      <CFormLabel>Buscar</CFormLabel>
                      <CFormInput type="text" name="search" value={search} onChange={onChangeForm} />
                    </>
                  ) : (
                    <>
                      <CFormLabel>Rango: $ 0 - {parseInt(range).toLocaleString()}</CFormLabel>
                      <br />

                      <CFormRange name="range" min={0} step={20000} max={1000000} defaultValue={range} onChange={onChangeForm} />
                    </>
                  )}
                </CCol>
                <CCol xs={1} className="align-self-center">
                  <CButton align="center" className="mt-4" type="submit" color="success" onClick={handle_Search}>
                    <CIcon icon={cilSearch} />
                  </CButton>
                </CCol>
              </CRow>
              <CRow className="mt-5">
                <CCol xs={12}>
                  <CTable align="middle" responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Comodidades</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {rooms?.map((item, index) => (
                        <CTableRow key={uuidv4()}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item.type}</CTableDataCell>
                          <CTableDataCell>{item.description}</CTableDataCell>
                          <CTableDataCell>{item.amenities?.join(', ')}</CTableDataCell>
                          <CTableDataCell>{item.price}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="info"
                              variant="outline"
                              className="me-1"
                              onClick={() => {
                                setVisibleModal(true)
                                setCurrentRoom(item)
                                onLoaderFormUserInfo(userInfo)
                              }}
                            >
                              Reservar
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        )}
        <CModal size="xl" visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <CModalHeader>
            <CModalTitle>Reservar</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3" validated={validated} onSubmit={handle_Save}>
              <CCol xs={3}>
                <CFormLabel>Tipo de documento</CFormLabel>
                <CFormSelect name="typeDoc" value={typeDoc} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required>
                  <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="DNI">DNI</option>
                  <option value="Tarjeta de residencia">Tarjeta de residencia</option>
                  <option value="NIE (Número de Identificación de Extranjero)">NIE (Número de Identificación de Extranjero)</option>
                </CFormSelect>
              </CCol>
              <CCol xs={3}>
                <CFormLabel>Identificación</CFormLabel>
                <CFormInput type="text" name="ID" value={ID} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={6}>
                <CFormLabel>Nombres</CFormLabel>
                <CFormInput type="text" name="firstName" value={firstName} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={8}>
                <CFormLabel>Apellidos</CFormLabel>
                <CFormInput type="text" name="lastName" value={lastName} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={4}>
                <CFormLabel>Teléfono</CFormLabel>
                <CFormInput type="number" name="phone" value={phone} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={6}>
                <CFormLabel>Email</CFormLabel>
                <CFormInput type="text" name="email" value={email} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={6}></CCol>
              <CCol xs={6}>
                <CFormLabel>Nombre de contacto de emergencia</CFormLabel>
                <CFormInput type="text" name="emergencyContactName" value={emergencyContactName} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={6}>
                <CFormLabel>Teléfono de contacto de emergencia</CFormLabel>
                <CFormInput type="number" name="emergencyContactPhone" value={emergencyContactPhone} onChange={onChangeFormUserInfo} feedbackinvalid="Requerido" required />
              </CCol>
              <CCol xs={2}>
                <CFormLabel>Fecha de entrada</CFormLabel>
                <h5>
                  <b>{checkInDate && checkInDate.toLocaleDateString()}</b>
                </h5>
              </CCol>
              <CCol xs={2}>
                <CFormLabel>Fecha de salida</CFormLabel>
                <h5>
                  <b>{checkOutDate && checkOutDate.toLocaleDateString()}</b>
                </h5>
              </CCol>
              <CCol xs={2}>
                <CFormLabel>N° de noches</CFormLabel>
                <h5>
                  <b>{getDifferenceDay()}</b>
                </h5>
              </CCol>
              <CCol xs={2}>
                <CFormLabel>Precio</CFormLabel>
                <h5>
                  <b>$ {currentRoom?.price}</b>
                </h5>
              </CCol>
              <CCol xs={2}>
                <CFormLabel>Valor total</CFormLabel>
                <h5>
                  <b>$ {getTotalPrice()}</b>
                </h5>
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
          </CModalBody>
        </CModal>
      </CContainer>
    </>
  )
}

export default Dashboard
