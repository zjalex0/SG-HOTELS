import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilHospital, cilCalendar } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '',
  },
  {
    component: CNavItem,
    name: 'Reservas',
    to: '/bookings',
    admin: true,
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Hoteles',
    to: '/hotels',
    admin: true,
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
  },
]

export default _nav
