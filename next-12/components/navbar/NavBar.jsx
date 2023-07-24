import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

export default function NavBar() {

  const { data: session } = useSession()

  return (
    <header className={styles.container}>
      <Link href='/'><div>Raffles App</div></Link>
      {
        session ?
        <ul>
            <Link href='#'><li>{session.user.email}</li></Link>
            <Link href='/createRaffle'><li>Nueva Rifa</li></Link>
            <button onClick={() => signOut()}>Sign out</button>
        </ul>
        :
        <ul>
            <button onClick={() => signIn()}>Sign in</button>
        </ul>
      }
    </header>
  )
}
