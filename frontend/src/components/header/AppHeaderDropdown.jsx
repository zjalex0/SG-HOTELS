import React from 'react'
import Swal from 'sweetalert2'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavLink } from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from 'src/hooks'

const AppHeaderDropdown = () => {
  const { user, startLogout } = useAuthStore()

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      showDenyButton: true,
      icon: 'question',
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        startLogout()
      }
    })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{user.name}</CDropdownHeader>
        <CNavLink to="/dashboard" component={NavLink}>
          <CIcon icon={cilUser} className="ms-2 me-2" />
          Perfil
        </CNavLink>
        {/* <CNavLink to="/setting" component={NavLink}>
          <CIcon icon={cilSettings} className="ms-2 me-2" />
          Configuración
        </CNavLink> */}
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
