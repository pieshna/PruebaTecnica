import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    console.log({ email, password })
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          navigate('/usuarios')
        }
      })
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto w-80 gap-2 p-4 shadow-md rounded bg-gray-100"
      >
        <h1 className="text-center font-semibold text-2xl">Login</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            className="p-2 w-full border rounded"
            type="text"
            name="email"
            placeholder="Ingrese su Correo"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="password" className="font-semibold">
            Password:
          </label>
          <input
            className="p-2 w-full border rounded"
            type="password"
            name="password"
            placeholder="******"
          />
        </div>
        <Link to="/register" className="text-center">
          Crear Cuenta
        </Link>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
