import { useState } from 'react'
import ExpertList from './components/ExpertList'
import ExpertDetail from './components/ExpertDetail'
import BookingForm from './components/BookingForm'
import MyBookings from './components/MyBookings'
import './App.css'

function App() {
  const [page, setPage] = useState('home')
  const [selectedExpert, setSelectedExpert] = useState(null)

  const navigate = (pageName, expert = null) => {
    setPage(pageName)
    if (expert) setSelectedExpert(expert)
  }

  return (
    <div>
      <nav style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        padding: '0 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '65px',
        boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div onClick={() => navigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>🎯</span>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>ExpertBook</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('home')} style={{
            background: page === 'home' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.3)', color: 'white',
            padding: '8px 20px', borderRadius: '25px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer'
          }}>🏠 Home</button>
          <button onClick={() => navigate('mybookings')} style={{
            background: page === 'mybookings' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.3)', color: 'white',
            padding: '8px 20px', borderRadius: '25px', fontSize: '14px',
            fontWeight: '500', cursor: 'pointer'
          }}>📅 My Bookings</button>
        </div>
      </nav>

      {page === 'home' && <ExpertList onSelectExpert={(expert) => navigate('detail', expert)} />}
      {page === 'detail' && <ExpertDetail expert={selectedExpert} onBook={(expert) => navigate('booking', expert)} onBack={() => navigate('home')} />}
      {page === 'booking' && <BookingForm expert={selectedExpert} onBack={() => navigate('detail', selectedExpert)} onSuccess={() => navigate('mybookings')} />}
      {page === 'mybookings' && <MyBookings onBack={() => navigate('home')} />}
    </div>
  )
}

export default App