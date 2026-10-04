import { ThemeProvider } from './context/ThemeProvider'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <ThemeProvider>
      <div className="portfolio-app">
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <Home />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
