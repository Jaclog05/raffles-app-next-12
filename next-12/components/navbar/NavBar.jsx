import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NavBar({user, checkStatus}) {

  const router = useRouter()

  const logout = async () => {
    await axios.get("http://localhost:4000/logout", {
      withCredentials: true
    })
    checkStatus()
    router.push('/')
  }

  return (
    <header className={styles.container}>
      <Link href='/'><div>Raffles App</div></Link>
      {
      user ? 
      <ul>
        <Link href='/dashboard'><li>{user.username.split(" ")[0]}</li></Link>
        <Link href='/createRaffle'><li>Nueva Rifa</li></Link>
        <button className={styles.logoutButton} onClick={logout}>Cerrar Sesión</button>
      </ul>
      :
      <ul>
        <Link className={styles.login} href='/login'>Ingresar</Link>
      </ul>
    }
    </header>
  )
}
