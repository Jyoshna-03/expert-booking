import { useState } from 'react'
import axios from 'axios'

export default function MyBookings({ onBack }) {
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const fetchBookings = async () => {
    if (!email) { setError('Please enter your email!'); return }
    try {
      setLoading(true)
      setError('')
      const res = await axios.get(`http://localhost:5000/bookings?email=${email}`)
      setBookings(res.data)
      setSearched(true)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch bookings!')
      setLoading(false)
    }
  }

  const statusConfig = (status) => {
    if (status === 'Pending') return { bg: '#fef9c3', color: '#ca8a04', icon: '⏳' }
    if (status === 'Confirmed') return { bg: '#dcfce7', color: '#16a34a', icon: '✅' }
    return { bg: '#dbeafe', color: '#2563eb', icon: '🎓' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <button onClick={onBack} style={{
            background: 'white', border: '1px solid #e2e8f0',
            padding: '8px 16px', borderRadius: '10px',
            cursor: 'pointer', color: '#64748b', fontSize: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>← Back</button>
          <div>
            <h2 style={{ color: '#1e3a8a', margin: 0, fontSize: '24px' }}>My Bookings</h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Track all your expert sessions</p>
          </div>
        </div>

        {/* Search Box */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '25px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '25px'
        }}>
          <p style={{ color: '#374151', marginBottom: '12px', fontWeight: '600' }}>
            🔍 Find your bookings
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchBookings()}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #2563eb',
                fontSize: '15px',
                outline: 'none',
                color: '#000000',
                background: '#ffffff',
                fontWeight: '500'
              }}
            />
            <button
              onClick={fetchBookings}
              style={{
                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                color: 'white', border: 'none',
                padding: '12px 24px', borderRadius: '10px',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(37,99,235,0.3)'
              }}>
              Search
            </button>
          </div>
          {error && (
            <p style={{
              color: '#dc2626', marginTop: '10px', fontSize: '14px',
              background: '#fee2e2', padding: '8px 12px', borderRadius: '8px'
            }}>{error}</p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>⏳</div>
            <p>Loading your bookings...</p>
          </div>
        )}

        {/* No Bookings */}
        {searched && !loading && bookings.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '50px', background: 'white',
            borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>📭</div>
            <h3 style={{ color: '#374151', marginBottom: '8px' }}>No bookings found</h3>
            <p style={{ color: '#64748b' }}>No bookings found for this email address</p>
          </div>
        )}

        {/* Booking Cards */}
        {bookings.map(booking => {
          const { bg, color, icon } = statusConfig(booking.status)
          return (
            <div key={booking._id} style={{
              background: 'white', borderRadius: '16px', padding: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '15px',
              borderLeft: `4px solid ${color}`
            }}>
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: 0, fontSize: '16px' }}>
                    📅 {booking.date}
                  </h3>
                  <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>
                    🕐 {booking.timeSlot}
                  </p>
                </div>
                <span style={{
                  background: bg, color, padding: '6px 14px',
                  borderRadius: '25px', fontSize: '13px', fontWeight: '600'
                }}>
                  {icon} {booking.status}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '15px' }} />

              {/* Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <p style={{ color: '#1e293b', fontSize: '14px', margin: 0 }}>
                  👤 <strong>Name:</strong> {booking.name}
                </p>
                <p style={{ color: '#1e293b', fontSize: '14px', margin: 0 }}>
                  📧 <strong>Email:</strong> {booking.email}
                </p>
                <p style={{ color: '#1e293b', fontSize: '14px', margin: 0 }}>
                  📞 <strong>Phone:</strong> {booking.phone}
                </p>
                {booking.notes && (
                  <p style={{ color: '#1e293b', fontSize: '14px', margin: 0 }}>
                    📝 <strong>Notes:</strong> {booking.notes}
                  </p>
                )}
              </div>
            </div>
          )
        })}

        {/* Summary */}
        {bookings.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            borderRadius: '16px', padding: '20px', marginTop: '10px',
            display: 'flex', justifyContent: 'space-around', color: 'white'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{bookings.length}</p>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>Total</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {bookings.filter(b => b.status === 'Pending').length}
              </p>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>Pending</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {bookings.filter(b => b.status === 'Confirmed').length}
              </p>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>Confirmed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                {bookings.filter(b => b.status === 'Completed').length}
              </p>
              <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>Completed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}