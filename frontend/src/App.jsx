import { Link, useNavigate } from 'react-router-dom'
import AppRouter from './Router'

function App() {
  const path = window.location.pathname.split('/').pop()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      {path == 'login' || path == 'register' ? null : (
        <div className="flex justify-end px-4">
          <Link to="/usuarios" className="p-4">
            Usuarios
          </Link>
          <Link to="/reportes" className="p-4">
            Reportes
          </Link>
          <button className="p-4" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
      <AppRouter />
    </>
  )
}

export default App
