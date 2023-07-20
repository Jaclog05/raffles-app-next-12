'use client'

import React from 'react'
import styles from './raffleDetails.module.css'
import { useState, useEffect } from 'react'
import daysToRaffle from '../../components/raffleComponent/raffleDates.js'
/* import Board from '../../components/board/Board' */
import axios from 'axios'
import { useRouter } from 'next/router'

export default function RaffleDetails() {

  const today = new Date()

  const router = useRouter()
  const {id} = router.query


  const [raffle, setRaffle] = useState([])

  useEffect(() => {

    async function fetchData(){
      const response = await axios.get(`http://localhost:4000/raffle/${id}`)
      return response.data
    }

    fetchData().then((rafflesAxios) => {
      setRaffle(rafflesAxios[0])
    })
  }, [])

  return (
    <div className={ raffle ? styles.wrapper : styles.raffleNotFound}>
      { raffle  ? 
        <div className={styles.container}>
          <div className={styles.left}>
              <h2>{raffle.prize}</h2> 
              <img src={raffle.image} alt='prize'/>
          </div>
          {/* <Board numTickets={raffle.numTickets}/> */}
          <div className={styles.right_bottom}>
              <h2>{raffle.numTickets} Boletas</h2>
              <h4>Juega con la lotería {raffle.lotery}</h4>
              <h3>{daysToRaffle(today, raffle.date)}</h3>
              <button>Comprar boletas</button>
          </div>
        </div>
        : 
          <h2>Rifa No Encontrada 🤔</h2>
      }
    </div>
  )
}
