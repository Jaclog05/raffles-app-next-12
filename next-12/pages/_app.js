import '../styles/globals.css'
import NavBar from '../components/navbar/NavBar'
import { ThemeProvider } from '../context/raffleState'
import axios from 'axios';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {

    try {
      const response = await axios.get("http://localhost:4000/profile", {
        withCredentials: true
      });
      const data = response.data;

      if (data.hasOwnProperty('email') && data.email.length) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };
  return (
      <ThemeProvider >
        <NavBar user={user} checkStatus={checkLoginStatus}/>
        <Component changeStatus={checkLoginStatus} {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
