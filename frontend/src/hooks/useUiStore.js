import { useDispatch, useSelector } from 'react-redux'
import { onCloseSideBar, onOpenSideBar } from '../store'

export const useUiStore = () => {
  const dispatch = useDispatch()

  const { isSideBarOpen } = useSelector((state) => state.ui)

  const openSideBar = () => {
    dispatch(onOpenSideBar())
  }

  const closeSideBar = () => {
    dispatch(onCloseSideBar())
  }

  const toggleSideBar = () => {
    isSideBarOpen ? closeSideBar() : openSideBar()
  }

  return {
    //* Propiedades
    isSideBarOpen,

    //* Métodos
    closeSideBar,
    openSideBar,
    toggleSideBar,
  }
}
