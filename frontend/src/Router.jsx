import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Usuarios from './Usuarios'
import CreateEditUser from './components/CreateEditUser'
import Reportes from './Reportes'
import CreateEditReporte from './components/CreateEditReporte'

const AppRouter = () => {
  const routes = [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/usuarios',
      component: Usuarios
    },
    {
      path: '/usuarios/editar/:id',
      component: CreateEditUser
    },
    {
      path: '/usuarios/crear',
      component: CreateEditUser
    },
    {
      path: '/register',
      component: CreateEditUser
    },
    {
      path: '/reportes',
      component: Reportes
    },
    {
      path: '/reportes/editar/:id',
      component: CreateEditReporte
    },
    {
      path: '/reportes/crear',
      component: CreateEditReporte
    }
  ]

  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </>
  )
}

export default AppRouter
