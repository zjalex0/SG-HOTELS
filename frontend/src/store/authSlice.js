import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'authenticated','not-authenticated',
    user: {},
    userInfo: {},
    errorMessage: undefined,
    isRegister: false,
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.user = {}
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    },
    onSetRegister: (state, { payload }) => {
      state.isRegister = payload
    },
    onSetUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onSetRegister, onSetUserInfo, clearErrorMessage } = authSlice.actions
