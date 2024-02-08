import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateEditReporte() {
  const path = window.location.pathname.split('/').pop()
  const id = path === 'crear' ? null : path
  const navigate = useNavigate()

  const [reporte, setReporte] = useState({
    nombre_reporte: '',
    estado: '',
    userId: '',
    created_at: '',
    updated_at: ''
  })

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:8000/api/reportes/${id}`, {
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
          userId: data[key].userId
        }
      })
      setReporte(reportes[0])
    })
  }, [id])

  const handleChange = (e) => {
    setReporte({ ...reporte, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const method = id ? 'PUT' : 'POST'
    const url = id
      ? `http://localhost:8000/api/reportes/${id}`
      : 'http://localhost:8000/api/reportes'
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(reporte)
    }).then(async (res) => {
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
      }
      navigate('/reportes')
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold p-2">
        {id ? 'Editar' : 'Crear'} Reporte
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-72 mx-auto pt-10 gap-3"
      >
        <div className="flex gap-4 items-center">
          <label htmlFor="nombre_reporte">Nombre del reporte</label>
          <input
            type="text"
            name="nombre_reporte"
            value={reporte.nombre_reporte}
            onChange={handleChange}
            className="p-2 w-full border rounded"
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="estado">Estado</label>
          <select
            name="estado"
            value={reporte.estado}
            onChange={handleChange}
            className="p-2 w-full border rounded"
          >
            <option value="">Seleccionar...</option>
            <option value="ACT">ACT</option>
            <option value="REC">REC</option>
            <option value="COM">COM</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="userId">Usuario</label>
          <select
            name="userId"
            value={reporte.userId}
            onChange={handleChange}
            className="p-2 w-full border rounded"
          >
            <option value="">Seleccionar...</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.email}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-between px-6">
          <Link to="/reportes">
            <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEditReporte
