import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function NavBar() {

  const { user } = useUser();

  return (
    <header className={styles.container}>
      <Link href='/'><div>Raffles App</div></Link>
      {
        user ? 
        <ul>
            <Link href='#'><li>{user.nickname}</li></Link>
            <Link href='/createRaffle'><li>Nueva Rifa</li></Link>
            <a className={styles.login} href="/api/auth/logout">Cerrar Sesion</a>
        </ul>
        :
        <ul>
            <a className={styles.login} href="/api/auth/login">Ingresar</a>
        </ul>
      }
    </header>
  )
}
