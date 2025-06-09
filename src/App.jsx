import { BrowserRouter, Route, Routes, Link } from 'react-router'
import './App.css'
import Page from './pages/Page'
import Rooms from './pages/Rooms'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import PaymentCallback from './pages/PaymentCallback'
import CustomerDashboard from './pages/CustomerDashboard' // Add this import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<CustomerDashboard />} /> {/* Add this route */}
        <Route path="/payment/callback" element={<PaymentCallback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App