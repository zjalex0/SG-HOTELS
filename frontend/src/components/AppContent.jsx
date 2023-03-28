import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useAuthStore } from 'src/hooks'

const AppContent = () => {
  const { user } = useAuthStore()

  return (
    <Suspense fallback={<CSpinner color="primary" />}>
      <Routes>
        {routes.map((route, idx) => {
          const isValParent = user.admin === route.admin || !user.admin === !route.admin || route.admin === undefined
          return (
            route.element && (
              <Route key={idx} path={route.path} exact={route.exact} name={route.name} element={isValParent && <route.element />}>
                {Array.isArray(route.items) &&
                  route.items.map((item, idx2) => {
                    const isValChild = user.admin === route.admin || !user.admin === !route.admin || route.admin === undefined
                    return item.element && <Route key={idx2} path={item.path} exact={item.exact} name={item.name} element={isValChild && <item.element />} />
                  })}
              </Route>
            )
          )
        })}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
