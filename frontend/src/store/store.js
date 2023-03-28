import { configureStore } from '@reduxjs/toolkit'
import { authSlice, hotelSlice, roomSlice, uiSlice, reservationSlice } from './'
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hotel: hotelSlice.reducer,
    room: roomSlice.reducer,
    ui: uiSlice.reducer,
    reservation: reservationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})
