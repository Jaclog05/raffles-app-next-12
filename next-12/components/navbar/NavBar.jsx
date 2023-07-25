import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <header className={styles.container}>
      <Link href='/'><div>Raffles App</div></Link>
        <ul>
            <Link href='#'><li>Jaider</li></Link>
            <Link href='/createRaffle'><li>Nueva Rifa</li></Link>
            <Link href='/login'>Ingresar</Link>
        </ul>
    </header>
  )
}
