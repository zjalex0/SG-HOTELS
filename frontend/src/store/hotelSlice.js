import { createSlice } from '@reduxjs/toolkit'

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    hotels: [
      // tempHotels
    ],
    activeHotel: null,
  },
  reducers: {
    onSetActiveHotel: (state, { payload }) => {
      state.activeHotel = payload
    },
    onAddNewHotel: (state, { payload }) => {
      state.hotels.push(payload)
      state.activeHotel = null
    },
    onUpdateHotel: (state, { payload }) => {
      state.hotels = state.hotels.map((item) => {
        if (item._id === payload._id) {
          return payload
        }
        return item
      })
    },
    onDeleteHotel: (state, { payload }) => {
      state.hotels = state.hotels.filter((item) => item._id !== payload._id)
      state.activeHotel = null
    },
    onLoadHotel: (state, { payload = [] }) => {
      state.hotels = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveHotel, onAddNewHotel, onUpdateHotel, onDeleteHotel, onLoadHotel } = hotelSlice.actions
