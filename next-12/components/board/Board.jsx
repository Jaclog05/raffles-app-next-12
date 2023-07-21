import React, {useState, useEffect} from 'react'
import styles from './Board.module.css'
import elements from './elements';

export default function Board({numTickets}) {

  const [boardState, setBoardState] = useState([])

  useEffect(() => {
    setBoardState([...elements(numTickets)])
  }, [])

  const toggle = (index) => {
    setBoardState((prevItems) => {
      const updatedItems = [...prevItems];
      const item = { ...updatedItems[index] };
      item.picked = !item.picked; 
      updatedItems[index] = item;
      return updatedItems;
    });
  };

  return (
    <div className={styles.wrapper}>
        {
            [...elements(numTickets)].map((number, idx) => (
                <p 
                  key={number.value}
                  onClick={() => toggle(idx)}
                  className={number.picked ? styles.picked : styles.noPicked}
                >
                  {number.value}
                </p>
            ))
        }
    </div>
  )
}
