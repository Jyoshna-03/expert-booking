import { useState } from 'react'
import axios from 'axios'

export default function BookingForm({ expert, onBack, onSuccess }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', timeSlot: '', notes: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const availableDates = expert.availableSlots.map(s => s.date)
  const availableSlots = form.date
    ? expert.availableSlots.find(s => s.date === form.date)?.slots || []
    : []

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.timeSlot) {
      setError('All fields are required!')
      return
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email!')
      return
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError('Please enter a valid 10 digit phone number!')
      return
    }

    try {
      setLoading(true)
      setError('')
      await axios.post('http://localhost:5000/bookings', {
        expertId: expert._id, ...form
      })
      setSuccess(true)
      setLoading(false)
      setTimeout(() => onSuccess(), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed!')
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
      <h2 style={{ color: '#16a34a' }}>Booking Successful!</h2>
      <p>Redirecting to My Bookings...</p>
    </div>
  )

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} style={{
        background: '#e5e7eb', border: 'none', padding: '8px 16px',
        borderRadius: '8px', marginBottom: '20px'
      }}>← Back</button>

      <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Book Session with {expert.name}</h2>

        {error && <p style={{ color: 'red', marginBottom: '15px', background: '#fee2e2', padding: '10px', borderRadius: '8px' }}>{error}</p>}

        {[
          { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter your name' },
          { label: 'Email', key: 'email', type: 'email', placeholder: 'Enter your email' },
          { label: 'Phone', key: 'phone', type: 'tel', placeholder: 'Enter 10 digit phone number' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: 'bold' }}>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: 'bold' }}>Date</label>
          <select
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value, timeSlot: '' })}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          >
            <option value="">Select a date</option>
            {availableDates.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: 'bold' }}>Time Slot</label>
          <select
            value={form.timeSlot}
            onChange={e => setForm({ ...form, timeSlot: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            disabled={!form.date}
          >
            <option value="">Select a time slot</option>
            {availableSlots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: 'bold' }}>Notes (Optional)</label>
          <textarea
            placeholder="Any special requirements..."
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', height: '80px' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? '#93c5fd' : '#2563eb', color: 'white',
            border: 'none', padding: '12px 24px', borderRadius: '8px',
            width: '100%', fontSize: '16px'
          }}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}