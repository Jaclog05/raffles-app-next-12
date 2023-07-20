import '../styles/globals.css'
import NavBar from '../components/navbar/NavBar'
import { ThemeProvider } from '../context/raffleState'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider >
      <NavBar/>
      <Component {...pageProps} />
    </ThemeProvider> 
  )
}

export default MyApp
