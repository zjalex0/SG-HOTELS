import { createSlice } from '@reduxjs/toolkit'

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservations: [
      // tempReservations
    ],
    activeReservation: null,
  },
  reducers: {
    onSetActiveReservation: (state, { payload }) => {
      state.activeReservation = payload
    },
    onAddNewReservation: (state, { payload }) => {
      state.reservations.push(payload)
      state.activeReservation = null
    },
    onUpdateReservation: (state, { payload }) => {
      state.reservations = state.reservations.map((item) => {
        if (item._id === payload._id) {
          return payload
        }
        return item
      })
    },
    onDeleteReservation: (state, { payload }) => {
      state.reservations = state.reservations.filter((item) => item._id !== payload._id)
      state.activeReservation = null
    },
    onLoadReservation: (state, { payload = [] }) => {
      state.reservations = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveReservation, onAddNewReservation, onUpdateReservation, onDeleteReservation, onLoadReservation } = reservationSlice.actions
