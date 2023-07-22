import React, {useState} from 'react'
import styles from './register.module.css'
import Link from 'next/link'
import { initialState_user } from './initialState_user'
import axios from 'axios'

export default function Register() {

    const [userInfo, setUserInfo] = useState(initialState_user)

    const handleChange = (e) => {
        const {value, name} = e.target
        setUserInfo(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/register", userInfo)
            .then(response => response.data)
            .catch(err => console.log(err))
        setUserInfo(initialState_user)
    }

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <h3>Registro</h3>
            <label>
                Ingrese su nombre completo
                <input onChange={handleChange} name='name'  value={userInfo.name}type='text'/>
            </label>
            <label>
                Ingrese un correo electrónico
                <input onChange={handleChange} name='email'  value={userInfo.email}type='email'/>
            </label>
            <div className={styles.passDiv}>
                <label>
                    Ingrese una contraseña
                    <input onChange={handleChange} name='password'  value={userInfo.password} type='password'/>
                </label>
                <label>
                    Confirme la contraseña
                    <input onChange={handleChange} name='confirmPassword' value={userInfo.confirmPassword} type='password'/>
                </label>
            </div>
            <div className={styles.passDiv}>
                <label>
                    Celular
                    <input onChange={handleChange} name='cellPhone'  value={userInfo.cellPhone}type='number'/>
                </label>
                <label>
                    Dirección
                    <input onChange={handleChange} name='address'  value={userInfo.address}type='text'/>
                </label>
            </div>
            <div className={styles.idDiv}>
                <label>
                    Tipo de documento
                    <select className={styles.idSelect} name='idType' onChange={handleChange}>
                        <option name='idType' value="CC">Cedula de ciudadanía</option>
                        <option name='idType' value="TI">Tarjeta de identidad</option>
                        <option name='idType' value="CE">Cedula de extranjería</option>
                    </select>
                </label>
                <label>
                    Numero de documento
                    <input className={styles.idInput} onChange={handleChange} name='idNum' type='number' value={userInfo.idNum}/>
                </label>
            </div>
            <input type="submit" value="Registrarse"/>
            <p>¿Ya tiene cuenta? Ingrese <a href='/api/auth/login'>aquí</a></p>
        </form>
    </div>
  )
}
