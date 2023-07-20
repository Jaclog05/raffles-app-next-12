'use client'

import React from 'react'
import styles from './create.module.css'
import { useThemeContext } from '../../context/raffleState'
import { useState } from 'react'
import { initialState } from './initialState'
import axios from 'axios'

export default function CreateRaffle() {

  const [raffleGlobal, setRaffleGlobal] = useThemeContext()

  const [raffleInfo, setRaffleInfo] = useState(initialState)

  const handleChange = async (e) => {
    const {value, name, type, files} = e.target

        if(type === 'file'){
            if(files && files[0]){
                const file = files[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'lm8j6moy');
            
                const CloudinaryResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/dra7sow0c/upload',
                    formData
                )
                setRaffleInfo(prevState => (
                    {
                        ...prevState,
                        image: CloudinaryResponse.data.secure_url
                    }
                ))
            }
        }

        setRaffleInfo(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/create", raffleInfo)
        .then(response => response.data)
        .catch(err => console.log(err))
    setRaffleInfo(initialState)
  }

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <h3>Creación de Rifas</h3>
            <label className={styles.fileImage}>
                Seleccione una foto del producto
                <input type="file" name="photo_raffle" id='file' onChange={handleChange}/>
            </label>
            <label>
                Seleccione cuantas boletas tendrá la rifa
                <select name='numTickets' onChange={handleChange}>
                    <option name='numTickets' value={50}>50 boletas</option>
                    <option name='numTickets' value={100}>100 boletas</option>
                    <option name='numTickets' value={200}>200 boletas</option>
                </select>
            </label>
            <label>
                Ingrese el articulo a rifar
                <input onChange={handleChange} name='prize' value={raffleInfo.prize} type='text'/>
            </label>
            <label>
                Indique con qué lotería se sabrá el ganador
                <input onChange={handleChange} name='lotery' value={raffleInfo.lotery} type='text'/>
            </label>
            <label>
                Indique la fecha en que jugará la rifa
                <input onChange={handleChange} name='date' value={raffleInfo.date} type="date" />
            </label>
            <label>
                Establezca el precio de la boleta (COP)
                <input onChange={handleChange} name='price' value={raffleInfo.price} type="number" step='500'/>
            </label>
            <input type="submit" value="Crear Rifa"/>
        </form>
    </div>
  )
}
