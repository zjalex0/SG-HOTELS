import { cilCheckAlt, cilPencil, cilXCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AppDatePicker } from 'src/components'
import { useReservationStore, useRoomStore } from 'src/hooks'
import { useForm } from 'src/hooks/useForm'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

const ViewBookings = () => {
  const { reservations = [], activeReservations, startLoadingReservations, setActiveReservation, startSavingReservation } = useReservationStore()
  const { rooms, startFindRooms } = useRoomStore()

  const [visibleRegister, setVisibleRegister] = useState(false)
  const [validated, setValidated] = useState(false)
  const [formState, onChangeForm, onResetForm, onLoaderForm] = useForm({
    _id: undefined,
    checkInDate: null,
    checkOutDate: null,
    roomType: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    totalPrice: 0,
    paid: false,
    state: null,
  })
  const { checkInDate, checkOutDate, guestName, guestEmail, guestPhone, emergencyContactName, emergencyContactPhone, state, paid, totalPrice } = formState

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
          startSavingReservation({ ...formState, checkInDate: checkInDate.toISOString(), checkOutDate: checkOutDate.toISOString(), totalPrice: getTotalPrice() })
          onResetForm()
          setVisibleRegister(false)
          setValidated(false)
        }
      })
    }
    setValidated(true)
  }

  const handle_LoadUpdate = (data) => {
    setVisibleRegister(true)
    setValidated(false)
    onLoaderForm({ ...data, checkInDate: new Date(data.checkInDate), checkOutDate: new Date(data.checkOutDate) })
    startFindRooms({ _id: data.room })
  }

  const handle_ConfirmAndCanceled = (item) => {
    Swal.fire({
      title: `¿Desea ${item.state === 'Cancelada' ? 'cancelar' : 'confirmar'} esta reserva?`,
      showDenyButton: true,
      icon: 'question',
      confirmButtonText: 'Continuar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const checkIn = visibleRegister ? checkInDate.toISOString() : item.checkInDate
        const checkOut = visibleRegister ? checkOutDate.toISOString() : item.checkOutDate
        const jsonData = { ...item, checkInDate: checkIn, checkOutDate: checkOut, totalPrice: getTotalPrice(), paid: true, confirm: true }
        startSavingReservation(jsonData)
        handle_LoadUpdate(jsonData)
        startLoadingReservations()
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
    return difference <= 0 ? totalPrice : difference * (rooms.length ? rooms[0]?.price : 0)
  }

  useEffect(() => {
    startLoadingReservations()
  }, [])

  useEffect(() => {
    if (!!activeReservations && Object.keys(activeReservations).length) {
      handle_LoadUpdate(activeReservations)
      // handle_LoadUpdate({ ...activeReservations, checkInDate: new Date(activeReservations.checkInDate), checkOutDate: new Date(activeReservations.checkOutDate) })
      setActiveReservation({})
    }
  }, [activeReservations])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h4 className="card-title mb-3">RESERVAS</h4>
          </CCol>
        </CRow>
        <CContainer fluid>
          <CCard className="mb-4">
            <CCardBody>
              {!visibleRegister ? (
                <CContainer fluid>
                  <CRow>
                    <CCol xs={12}>
                      <CTable align="middle" responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Fecha de entrada</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Fecha de salida</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Contacto</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Habitación/Tipo</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
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
                                {item.guestName}, <b>Tel:</b> {item.guestPhone}
                              </CTableDataCell>
                              <CTableDataCell>
                                {item.rooms[0].roomNumber} - {item.rooms[0].type}
                              </CTableDataCell>
                              <CTableDataCell>
                                {!!item.state && (
                                  <h6 className={`text-${item.state === 'Confirmada' ? 'success' : 'danger'}`}>
                                    <b>{`${item.state}`.toLocaleUpperCase()}</b>
                                  </h6>
                                )}
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton color="info" variant="outline" className="me-1" onClick={() => handle_LoadUpdate(item)}>
                                  <CIcon icon={cilPencil} />
                                </CButton>
                                {!item.state && (
                                  <>
                                    <CButton
                                      color="success"
                                      variant="outline"
                                      className="me-1"
                                      title="Confirmar"
                                      onClick={() => {
                                        handle_ConfirmAndCanceled({ ...item, state: 'Confirmada' })
                                      }}
                                    >
                                      <CIcon icon={cilCheckAlt} />
                                    </CButton>
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      title="Cancelar"
                                      onClick={() => {
                                        handle_ConfirmAndCanceled({ ...item, state: 'Cancelada' })
                                      }}
                                    >
                                      <CIcon icon={cilXCircle} />
                                    </CButton>
                                  </>
                                )}
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CContainer>
              ) : (
                <CForm className="row g-3" validated={validated} onSubmit={handle_Save}>
                  <CCol xs={6}>
                    <CRow>
                      <CCol xs={6}>
                        <CFormLabel>Fecha de entrada</CFormLabel>
                        <AppDatePicker name="checkInDate" value={checkInDate} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Fecha de salida</CFormLabel>
                        <AppDatePicker name="checkOutDate" value={checkOutDate} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Cliente</CFormLabel>
                        <CFormInput type="text" name="guestName" value={guestName} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Teléfono</CFormLabel>
                        <CFormInput type="text" name="guestPhone" value={guestPhone} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                      <CCol xs={12}>
                        <CFormLabel>Correo</CFormLabel>
                        <CFormInput type="text" name="guestEmail" value={guestEmail} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Nombre de contacto de emergencia</CFormLabel>
                        <CFormInput type="text" name="emergencyContactName" value={emergencyContactName} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Teléfono de contacto de emergencia</CFormLabel>
                        <CFormInput type="text" name="emergencyContactPhone" value={emergencyContactPhone} onChange={onChangeForm} disabled={!!state} />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol xs={6}>
                    <CRow>
                      <CCol xs={6}>
                        <CFormLabel>Habitación</CFormLabel>
                        <br />
                        <h4>
                          <b>{rooms[0]?.roomNumber}</b>
                        </h4>
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Tipo de habitación</CFormLabel>
                        <br />
                        <h4>
                          <b>{rooms[0]?.type}</b>
                        </h4>
                      </CCol>

                      <CCol xs={6}>
                        <CFormLabel>Descripción</CFormLabel>
                        <br />
                        <p>
                          <b>{rooms[0]?.description}</b>
                        </p>
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Comodidades</CFormLabel>
                        <br />
                        <h5>
                          <b>{rooms[0]?.amenities?.join(', ')}</b>
                        </h5>
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Pagada</CFormLabel>
                        <h5>
                          <b>{paid ? 'Si' : 'No'}</b>
                        </h5>
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>N° de noches</CFormLabel>
                        <h5>
                          <b>{getDifferenceDay()}</b>
                        </h5>
                      </CCol>
                      <CCol xs={6}>
                        {!!state && (
                          <>
                            <CFormLabel>Estado</CFormLabel>
                            <h6 className={`text-${state === 'Confirmada' ? 'success' : 'danger'}`}>
                              <b>{`${state}`.toLocaleUpperCase()}</b>
                            </h6>
                          </>
                        )}
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel>Precio</CFormLabel>
                        <h5>
                          <b>$ {rooms[0]?.price}</b>
                        </h5>
                      </CCol>
                      <CCol xs={6}></CCol>
                      <CCol xs={6}>
                        <CFormLabel>Valor total</CFormLabel>
                        <h5>
                          <b>$ {getTotalPrice()}</b>
                        </h5>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol xs={12}>
                    {!state && (
                      <>
                        <CButton
                          color="danger"
                          variant="outline"
                          className="float-end  ms-2"
                          title="Cancelar"
                          onClick={() => {
                            handle_ConfirmAndCanceled({ ...formState, state: 'Cancelada' })
                          }}
                        >
                          <CIcon icon={cilXCircle} />
                          {` `}
                          Cancelar reserva
                        </CButton>
                        <CButton
                          color="success"
                          variant="outline"
                          className="float-end me-1"
                          title="Confirmar"
                          onClick={() => {
                            handle_ConfirmAndCanceled({ ...formState, state: 'Confirmada' })
                          }}
                        >
                          <CIcon icon={cilCheckAlt} />
                          {` `}
                          Confirmar reserva
                        </CButton>

                        <CButton color="info" className="float-start ms-2" type="submit">
                          Actualizar datos
                        </CButton>
                      </>
                    )}
                    <CButton color="danger" className="float-start ms-2" onClick={handle_Cancel}>
                      Regresar
                    </CButton>
                  </CCol>
                </CForm>
              )}
            </CCardBody>
          </CCard>
        </CContainer>
      </CCardBody>
    </CCard>
  )
}
ViewBookings.propTypes = {}

export default ViewBookings
