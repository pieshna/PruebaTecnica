import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateEditUser() {
  const path = window.location.pathname.split('/').pop()
  const id = path === 'crear' || path === 'register' ? null : path
  const navigate = useNavigate()

  const [user, setUser] = useState({ email: '', password: '', active: true })

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:8000/api/usuario/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(async (res) => {
      const data = await res.json()
      setUser(data)
    })
  }, [id])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const method = id ? 'PUT' : 'POST'
    if (id) {
      delete user.password
    }
    const url = id
      ? `http://localhost:8000/api/usuario/${id}`
      : 'http://localhost:8000/api/register'
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user)
    }).then(async (res) => {
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
      }
      navigate('/usuarios')
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold p-2">
        {id ? 'Editar' : 'Crear'} Usuario
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-56 mx-auto pt-10 gap-3"
      >
        <div className="flex gap-4 items-center">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="p-2 w-full border rounded"
          />
        </div>
        {!id && (
          <div className="flex gap-4 items-center">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="p-2 w-full border rounded"
            />
          </div>
        )}

        <div className="flex gap-4 items-center">
          <label htmlFor="active">Activo</label>
          <input
            type="checkbox"
            name="active"
            checked={user.active}
            onChange={handleChange}
            className="p-2 w-full border rounded"
          />
        </div>
        <div className="flex flex-row justify-between px-6">
          <Link to="/usuarios">
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

export default CreateEditUser
