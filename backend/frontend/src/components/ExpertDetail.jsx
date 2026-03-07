import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

export default function ExpertDetail({ expert, onBook, onBack }) {
  const [bookedSlots, setBookedSlots] = useState([])

  useEffect(() => {
    socket.on('slotBooked', (data) => {
      if (data.expertId === expert._id) {
        setBookedSlots(prev => [...prev, `${data.date}-${data.timeSlot}`])
      }
    })
    return () => socket.off('slotBooked')
  }, [expert._id])

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} style={{
        background: '#e5e7eb', border: 'none', padding: '8px 16px',
        borderRadius: '8px', marginBottom: '20px'
      }}>← Back</button>

      <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '15px' }}>👨‍💼</div>
        <h2 style={{ color: '#1e3a8a', textAlign: 'center' }}>{expert.name}</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '5px' }}>📁 {expert.category}</p>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '5px' }}>💼 {expert.experience} years experience</p>
        <p style={{ textAlign: 'center', color: '#f59e0b', marginBottom: '15px' }}>⭐ {expert.rating}/5</p>
        <p style={{ textAlign: 'center', color: '#374151', marginBottom: '25px' }}>{expert.bio}</p>

        <h3 style={{ color: '#1e3a8a', marginBottom: '15px' }}>Available Slots</h3>
        {expert.availableSlots.map(({ date, slots }) => (
          <div key={date} style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#374151', marginBottom: '10px' }}>📅 {date}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {slots.map(slot => {
                const isBooked = bookedSlots.includes(`${date}-${slot}`)
                return (
                  <span key={slot} style={{
                    padding: '6px 14px', borderRadius: '20px',
                    background: isBooked ? '#fee2e2' : '#dcfce7',
                    color: isBooked ? '#dc2626' : '#16a34a',
                    fontSize: '14px'
                  }}>
                    {slot} {isBooked ? '❌' : '✅'}
                  </span>
                )
              })}
            </div>
          </div>
        ))}

        <button onClick={() => onBook(expert)} style={{
          background: '#2563eb', color: 'white', border: 'none',
          padding: '12px 24px', borderRadius: '8px', width: '100%',
          fontSize: '16px', marginTop: '20px'
        }}>
          Book Session
        </button>
      </div>
    </div>
  )
}