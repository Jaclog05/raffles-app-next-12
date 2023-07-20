'use client'

import { useThemeContext } from '../context/raffleState'
import Raffle from '../components/raffleComponent/RaffleComponent'
import styles from '../styles/Home.module.css'
import daysToRaffle from '../components/raffleComponent/raffleDates'
import Link from 'next/link'
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {

  const [raffleInfo, setRaffleInfo] = useThemeContext()
  
  const today = new Date()

  useEffect(() => {

    async function fetchData(){
      const response = await axios.get("http://localhost:4000/")
      return response.data
    }

    fetchData().then((rafflesAxios) => {
      setRaffleInfo(prevInfo => {
        return {
          ...prevInfo,
          rafflesArray: rafflesAxios
        }
      })
    })
  }, [])

  const handleClosing = (id) => {
    axios.delete("http://localhost:4000/raffle/" + id)
        .then(response => response.data)
        .catch(err => console.log(err))
    setRaffleInfo(prevInfo => {
      return {
        ...prevInfo,
        rafflesArray: prevInfo.rafflesArray.filter(raffle => raffle._id != id)
      }
    })
  }

  return (
      <div className={raffleInfo.rafflesArray.length ? styles.rafflesWrapper : styles.noRafflesCreated}>
          { raffleInfo.rafflesArray.length ? 
            raffleInfo.rafflesArray.map((raffle, idx) => {
              return (
                <Link href={`/raffle/${encodeURIComponent(raffle._id)}`} key={idx}>
                  <Raffle
                    id={raffle._id}
                    img={raffle.image}
                    numTickets={raffle.numTickets}
                    prize={raffle.prize}
                    price={raffle.price}
                    handleClosing={handleClosing}
                    dateInfo={daysToRaffle(today, raffle.date)}
                />
                </Link>
              )
            })
          : <h1>Aún no hay rifas creadas 🤔</h1>
          }
      </div>
  )
}