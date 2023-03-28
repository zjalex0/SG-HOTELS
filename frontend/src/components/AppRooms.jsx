import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormCheck,
  CFormSelect,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useRoomStore } from 'src/hooks'
import { useForm } from 'src/hooks/useForm'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

const AppRooms = ({ idHotel }) => {
  const { rooms, startFindRoomsHotel, startDeletingRoom, startSavingRoom } = useRoomStore()
  const [visibleModal, setVisibleModal] = useState(false)
  const [dataAmenities, setDataAmenities] = useState([])
  const [validated, setValidated] = useState(false)

  const [formState, onChangeForm, onResetForm, onLoaderForm] = useForm({
    _id: undefined,
    roomNumber: '',
    type: '',
    description: '',
    price: 0,
    active: false,
  })
  const { roomNumber, type, description, price, active } = formState

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
          startSavingRoom({ ...formState, amenities: dataAmenities, hotel: idHotel })
          onResetForm()
          setValidated(false)
          setVisibleModal(false)
        }
      })
    }
    setValidated(true)
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
        startDeletingRoom(hotel)
      }
    })
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

  const handle_LoadUpdate = (data) => {
    setValidated(false)
    onLoaderForm(data)
    setDataAmenities(data.amenities)
  }

  const handle_UpdateAmenities = (e) => {
    const data = [...dataAmenities]
    if (!e.target.checked) {
      let index = data?.indexOf(e.target.name)
      index > -1 && data.splice(index, 1)
    } else {
      data.push(e.target.name)
    }
    setDataAmenities(data)
  }

  useEffect(() => {
    startFindRoomsHotel(idHotel)
  }, [idHotel])

  return (
    <CContainer fluid>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CButton className="float-start" shape="rounded-pill" onClick={() => setVisibleModal(true)}>
                <strong>+ Agregar</strong>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Código</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Comodidades</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Activo</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {rooms?.map((item, index) => (
                    <CTableRow key={uuidv4()}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.roomNumber}</CTableDataCell>
                      <CTableDataCell>{item.type}</CTableDataCell>
                      <CTableDataCell>{item.description}</CTableDataCell>
                      <CTableDataCell>{item.amenities?.join(', ')}</CTableDataCell>
                      <CTableDataCell>{item.price}</CTableDataCell>
                      <CTableDataCell>
                        <CFormSwitch disabled checked={item.active} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          variant="outline"
                          className="me-1"
                          onClick={() => {
                            handle_LoadUpdate(item)
                            setVisibleModal(true)
                          }}
                        >
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal size="xl" visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <CModalHeader>
          <CModalTitle>{!!formState._id ? 'Editar' : 'Agregar'} habitación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" noValidate validated={validated} onSubmit={handle_Save}>
            <CCol xs={6}>
              <CFormLabel>Código</CFormLabel>
              <CFormInput type="text" name="roomNumber" value={roomNumber} onChange={onChangeForm} feedbackinvalid="Requerido" required />
            </CCol>
            <CCol xs={6}>
              <CFormLabel>Tipo</CFormLabel>
              <CFormSelect name="type" value={type} onChange={onChangeForm} feedbackinvalid="Requerido" required>
                <option value="Habitación sencilla">Habitación sencilla</option>
                <option value="Habitación doble">Habitación doble</option>
                <option value="Habitación triple">Habitación triple</option>
                <option value="Habitación cuádruple">Habitación cuádruple</option>
                <option value="Suite">Suite</option>
                <option value="Habitación ejecutiva">Habitación ejecutiva</option>
              </CFormSelect>
            </CCol>
            <CCol xs={6}>
              <CFormLabel>Descripción</CFormLabel>
              <CFormTextarea name="description" value={description} onChange={onChangeForm} rows={3}></CFormTextarea>
            </CCol>
            <CCol xs={6}>
              <CRow>
                <CCol xs={5}>
                  <CFormLabel>Precio</CFormLabel>
                  <CFormInput name="price" value={price} onChange={onChangeForm} feedbackinvalid="Requerido" required></CFormInput>
                  <br />
                  <CFormSwitch label="Activo" name="active" onChange={onChangeForm} checked={active} />
                </CCol>
                <CCol xs={7}>
                  <CFormCheck onChange={handle_UpdateAmenities} name="wifi" label="wifi" defaultChecked={dataAmenities?.includes('wifi')} />
                  <CFormCheck onChange={handle_UpdateAmenities} name="tv" label="tv" defaultChecked={dataAmenities?.includes('tv')} />
                  <CFormCheck onChange={handle_UpdateAmenities} name="aire acondicionado" label="aire acondicionado" defaultChecked={dataAmenities?.includes('aire acondicionado')} />
                  <CFormCheck onChange={handle_UpdateAmenities} name="jacuzzi" label="jacuzzi" defaultChecked={dataAmenities?.includes('jacuzzi')} />
                  <CFormCheck onChange={handle_UpdateAmenities} name="minibar" label="minibar" defaultChecked={dataAmenities?.includes('minibar')} />
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
        </CModalBody>
      </CModal>
    </CContainer>
  )
}
AppRooms.propTypes = { idHotel: PropTypes.string, onResult: PropTypes.func }

export default AppRooms
