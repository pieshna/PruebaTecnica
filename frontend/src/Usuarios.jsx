import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Usuarios() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [usuarios, setUsuarios] = useState([])
  const [reload, setReload] = useState(false)
  useEffect(() => {
    if (!token) return navigate('/login')
    fetch('http://localhost:8000/api/usuario', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(async (res) => {
      const data = await res.json()
      const usuarios = Object.keys(data).map((key) => {
        return {
          id: data[key].id,
          email: data[key].email,
          active: data[key].active
        }
      })
      setUsuarios(usuarios)
    })
  }, [reload])

  const handleChangeStatus = (id) => {
    fetch(`http://localhost:8000/api/usuario/change/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      setReload(!reload)
    })
  }

  return (
    <div className="p-4">
      <Link to="/usuarios/crear">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Crear Usuario
        </button>
      </Link>
      <h1 className="text-2xl text-center font-bold p-2">Usuarios Activos</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase border bg-slate-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b">
                <th scope="row" className="px-6 py-4 font-medium">
                  {usuario.email}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {usuario.active ? 'Activo' : 'Inactivo'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-5">
                  <Link to={`/usuarios/editar/${usuario.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleChangeStatus(usuario.id)}
                    className={`${
                      usuario.active
                        ? 'bg-red-500 hover:bg-red-700'
                        : 'bg-green-500 hover:bg-green-700'
                    } text-white py-2 px-4 rounded`}
                  >
                    {usuario.active ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Usuarios
