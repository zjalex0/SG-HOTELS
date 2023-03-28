import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavLink, CNavItem, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { useAuthStore, useUiStore } from 'src/hooks'

const AppHeader = () => {
  const { toggleSideBar } = useUiStore()
  const { user } = useAuthStore()

  return (
    <>
      <CHeader position="fixed" className="mb-2">
        <CContainer fluid>
          <CHeaderToggler className="ps-1" onClick={toggleSideBar}>
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex ">
            <CNavItem className="me-4">
              <CNavLink to="/dashboard" component={NavLink}>
                <h5>
                  <b>SG-HOTELS</b>
                </h5>
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CCol sm={6} className="m-auto"></CCol>
          <CHeaderNav>
            <h6 className="mt-2 me-3 float-end">
              <b>{`${user.firstName || ''}`.toUpperCase()}</b>
            </h6>
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </>
  )
}

export default AppHeader
