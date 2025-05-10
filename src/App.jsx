import { BrowserRouter, Route, Routes, Link } from 'react-router'
import './App.css'
import Page from './pages/Page'
import Rooms from './pages/Rooms'
import Menu from './pages/Menu'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
    
}

export default App
