import '../styles/globals.css'
import NavBar from '../components/navbar/NavBar'
import { ThemeProvider } from '../context/raffleState'
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider >
        <NavBar/>
        <Component {...pageProps} />
      </ThemeProvider> 
    </UserProvider>
  )
}

export default MyApp
