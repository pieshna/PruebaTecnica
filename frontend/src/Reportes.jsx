import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Reportes() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [reportes, setReportes] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (!token) return navigate('/login')
    fetch('http://localhost:8000/api/reportes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(async (res) => {
      const data = await res.json()
      const reportes = Object.keys(data).map((key) => {
        return {
          id: data[key].id,
          nombre_reporte: data[key].nombre_reporte,
          estado: data[key].estado,
          email: data[key].email,
          created_at: data[key].created_at,
          updated_at: data[key].updated_at
        }
      })
      setReportes(reportes)
    })
  }, [reload])

  const handleChangeStatus = (id) => {
    fetch(`http://localhost:8000/api/reportes/change/${id}`, {
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
      <Link to="/reportes/crear">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Crear Reporte
        </button>
      </Link>
      <h1 className="text-2xl text-center font-bold p-2">Reportes</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase border bg-slate-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre del reporte
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de creación
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de actualización
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr key={reporte.id} className="border-b">
                <th scope="row" className="px-6 py-4 font-medium">
                  {reporte.nombre_reporte}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reporte.estado}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{reporte.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reporte.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {reporte.updated_at}
                </td>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    onClick={() => handleChangeStatus(reporte.id)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                  >
                    Cambiar estado
                  </button>
                  <Link to={`/reportes/editar/${reporte.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                      Editar
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reportes
