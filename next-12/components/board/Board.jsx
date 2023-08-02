import styles from './Board.module.css'

export default function Board({toggle, board}) {

  return (
    <div className={styles.wrapper}>
        {
            board.map((number, idx) => (
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