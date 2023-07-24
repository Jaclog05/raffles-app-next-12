import React from 'react'
import styles from './RaffleComponent.module.css'
import deleteCloud from './deleteCloud'
/* import { useUser } from '@auth0/nextjs-auth0/client'; */

export default function Raffle({id, img, numTickets, prize, price, handleClosing, dateInfo}) {

  const handleClick = (e) => {
    e.preventDefault()
    handleClosing(id)
    deleteCloud(getPublicIdFromUrl(img))
  }

  const getPublicIdFromUrl = (url) => {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  /* const { user } = useUser(); */


  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h4>{prize}</h4>
        <button onClick={handleClick}> ✖ </button>
        <img src={img} alt='prize'/>
      </div>
      <div className={styles.bottom}>
        <h4 className={styles.price}>$ {price} /<span>boleta</span></h4>
        <h3 className={styles.numTickets}>{numTickets} boletas</h3>
        <h5>{dateInfo} <span className={dateInfo[3] !== 'ó' ? styles.playing : styles.finished}> ● </span></h5>
      </div>
    </div>
  )
}