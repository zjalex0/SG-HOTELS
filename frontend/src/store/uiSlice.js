import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSideBarOpen: false,
  },
  reducers: {
    onOpenSideBar: (state) => {
      state.isSideBarOpen = true
    },
    onCloseSideBar: (state) => {
      state.isSideBarOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { onOpenSideBar, onCloseSideBar } = uiSlice.actions
