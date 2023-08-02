import styles from './Board.module.css'

export default function Board({toggle, numbers}) {

  return (
    <div className={styles.wrapper}>
        {
            numbers.map((number, idx) => (
                <p 
                  key={number.value}
                  onClick={() => {
                    toggle(number, idx)
                  }}
                  className={number.picked ? styles.picked : styles.noPicked}
                >
                  {number.value}
                </p>
            ))
        }
    </div>
  )
}