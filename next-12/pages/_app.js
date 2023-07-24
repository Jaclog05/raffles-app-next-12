import '../styles/globals.css'
import NavBar from '../components/navbar/NavBar'
import { ThemeProvider } from '../context/raffleState'
import { SessionProvider } from "next-auth/react"

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider >
        <NavBar/>
        <Component {...pageProps} />
      </ThemeProvider> 
    </SessionProvider>
  )
}

export default MyApp
