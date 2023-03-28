import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { useUiStore } from 'src/hooks'

const AppSidebar = () => {
  const { isSideBarOpen, openSideBar, closeSideBar } = useUiStore()

  return (
    <CSidebar
      position="fixed"
      unfoldable={false}
      visible={isSideBarOpen}
      onVisibleChange={(visible) => {
        visible ? openSideBar() : closeSideBar()
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        {/* <CImage className="d-block w-100" src="assets/images/logo.png" alt="slide 1" height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
