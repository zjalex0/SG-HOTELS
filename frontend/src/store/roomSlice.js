import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: [
      // tempRooms
    ],
    activeRoom: null,
  },
  reducers: {
    onSetActiveRoom: (state, { payload }) => {
      state.activeRoom = payload
    },
    onAddNewRoom: (state, { payload }) => {
      state.rooms.push(payload)
      state.activeRoom = null
    },
    onUpdateRoom: (state, { payload }) => {
      state.rooms = state.rooms.map((item) => {
        if (item._id === payload._id) {
          return payload
        }
        return item
      })
    },
    onDeleteRoom: (state, { payload }) => {
      state.rooms = state.rooms.filter((item) => item._id !== payload._id)
      state.activeRoom = null
    },
    onLoadRoom: (state, { payload = [] }) => {
      state.rooms = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveRoom, onAddNewRoom, onUpdateRoom, onDeleteRoom, onLoadRoom } = roomSlice.actions
