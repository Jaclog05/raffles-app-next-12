'use client'

import React from 'react'
import styles from './raffleDetails.module.css'
import { useState, useEffect } from 'react'
import daysToRaffle from '../../components/raffleComponent/raffleDates.js'
import Board from '../../components/board/Board'
import axios from 'axios'
import { useRouter } from 'next/router'
import elements from '../../components/board/elements'

export default function RaffleDetails() {

  const today = new Date()

  const router = useRouter()
  const {id} = router.query

  const [raffle, setRaffle] = useState([])
  const [boardState, setBoardState] = useState([])
  const [numbers, setNumbers] = useState([])

  const toggle = (numberObj, index) => {
    let isAlreadyOnBoardState = false

    for(let i = 0; i < boardState.length; i++){
      if(boardState[i].price_data.product_data.description == index + 1){
        isAlreadyOnBoardState = true;
        break
      }
    }

    if(isAlreadyOnBoardState === false){
      setBoardState((prevItems) => {
        return [...prevItems, {
          price_data: {
            product_data: {
              description: `${numberObj.value}`,
              name: `Boleta #${numberObj.value} `,
            },
          currency: "usd",
          unit_amount: raffle.price,
          },
          quantity: 1,
        }]
      });
    }else{
      setBoardState(boardState.filter(item => item.price_data.product_data.description != index + 1))
    }
    setNumbers((prevItems) => {
      const updatedItems = [...prevItems];
      const item = { ...updatedItems[index] };
      item.picked = !item.picked; 
      updatedItems[index] = item;
      return updatedItems;
    });
  };

  const totalPrice = (price) => {
    let total = boardState.length * price
    return total
  }

  const handlePayment = async () => {
      const response = await axios.post('http://localhost:4000/payment', boardState)
      router.push(response.data.url)
  }

  useEffect(() => {

    async function fetchData(){
      const response = await axios.get(`http://localhost:4000/raffle/${id}`)
      return response.data
    }

    fetchData().then((rafflesAxios) => {
      setRaffle(rafflesAxios[0])
      setNumbers(elements(rafflesAxios[0].numTickets))
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
          <Board 
            numTickets={raffle.numTickets}
            toggle={toggle}
            numbers={numbers}
          />
          <div className={styles.right_bottom}>
              <h2>{raffle.numTickets} Boletas</h2>
              <h4>Juega con la lotería {raffle.lotery}</h4>
              <h3>{daysToRaffle(today, raffle.date)}</h3>
              { 
                totalPrice(raffle.price) ?
                <h3>$ {totalPrice(raffle.price)}</h3>
                : null
              }
              <button onClick={handlePayment}>Comprar boletas</button>
          </div>
        </div>
        : 
          <h2>Rifa No Encontrada 🤔</h2>
      }
    </div>
  )
}