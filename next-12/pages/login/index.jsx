import React, {useState} from 'react'
import styles from './login.module.css'
import { initialState_login } from '../login/initialState_login'
import Link from 'next/link'
import axios from 'axios'

export default function Login() {

  const [userInfo, setUserInfo] = useState(initialState_login)

    const handleChange = (e) => {
        const {value, name} = e.target
        setUserInfo(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(userInfo)
      const response = await axios.post("http://localhost:4000/login", userInfo)
          /* .then(response => response.data)
          .catch(err => console.log(err)) */
      console.log(response)
      setUserInfo(initialState_login)
    }

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <h3>Ingreso</h3>
            <label>
                Ingrese su correo electrónico
                <input onChange={handleChange} value={userInfo.email} name='email' type='email'/>
            </label>
            <label>
                Ingrese su contraseña
                <input onChange={handleChange} value={userInfo.password} name='password' type='password'/>
            </label>
            <input type="submit" value="Log In"/>
            <p>¿No tienes cuenta aún? Registrate <Link href='/register'>aquí</Link></p>
        </form>
    </div>
  )
}