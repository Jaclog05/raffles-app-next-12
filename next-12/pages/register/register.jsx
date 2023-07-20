import React from 'react'
import styles from './register.module.css'
import Link from 'next/link'

export default function Register() {
  return (
    <div className={styles.container}>
        <form>
            <h3>Registro</h3>
            <label>
                Ingrese su nombre completo
                <input name='name' type='email'/>
            </label>
            <label>
                Ingrese un correo electrónico
                <input name='email' type='email'/>
            </label>
            <div className={styles.passDiv}>
                <label>
                    Ingrese una contraseña
                    <input name='password' type='password'/>
                </label>
                <label>
                    Confirme la contraseña
                    <input name='password' type='password'/>
                </label>
            </div>
            <div className={styles.passDiv}>
                <label>
                    Celular
                    <input name='cellPhone' type='number'/>
                </label>
                <label>
                    Dirección
                    <input name='address' type='text'/>
                </label>
            </div>
            <div className={styles.idDiv}>
                <label>
                    Tipo de documento
                    <select className={styles.idSelect} name='idType'>
                        <option name='idType' value={1}>Cedula de ciudadanía</option>
                        <option name='idType' value={2}>Tarjeta de identidad</option>
                        <option name='idType' value={3}>Cedula de extranjería</option>
                    </select>
                </label>
                <label>
                    Numero de documento
                    <input className={styles.idInput} name='idNum' type='number'/>
                </label>
            </div>
            <input type="submit" value="Registrarse"/>
            <p>¿Ya tiene cuenta? Ingrese <Link href='/login'>aquí</Link></p>
        </form>
    </div>
  )
}
