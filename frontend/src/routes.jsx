import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))

// view setting
const ViewHotels = React.lazy(() => import('./views/ViewHotels'))
const ViewBookings = React.lazy(() => import('./views/ViewBookings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/hotels', name: 'Gestión de Hoteles', admin: true, element: ViewHotels },
  { path: '/bookings', name: 'Gestión de Hoteles', admin: true, element: ViewBookings },
  // {
  //   path: '/setting',
  //   name: 'setting',
  //   element: ViewSetting,
  //   items: [
  //     { path: '/setting/hotels', name: 'hotels', element: ViewHotels },
  //     { path: '/setting/bookings', name: 'bedrooms', element: SettingBookings },
  //   ],
  // },
  // { path: '/setting/products', name: 'products', element: SettingProducts },
]

export default routes
