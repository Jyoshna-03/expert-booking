import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ExpertList({ onSelectExpert }) {
  const [experts, setExperts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchExperts = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:5000/experts', {
        params: { search, category, page, limit: 6 }
      })
      setExperts(res.data.experts)
      setTotalPages(res.data.totalPages)
      setLoading(false)
    } catch (err) {
      setError('Failed to load experts')
      setLoading(false)
    }
  }

  useEffect(() => { fetchExperts() }, [search, category, page])

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '20px', color: '#1e3a8a' }}>Find an Expert</h1>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', flex: 1, color: '#000', background: '#fff' }}
        />
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setPage(1) }}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', color: '#000', background: '#fff' }}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading experts...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {experts.map(expert => (
          <div key={expert._id} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer'
          }} onClick={() => onSelectExpert(expert)}>
            <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>👨‍💼</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '5px' }}>{expert.name}</h3>
            <p style={{ color: '#6b7280', marginBottom: '5px' }}>📁 {expert.category}</p>
            <p style={{ color: '#6b7280', marginBottom: '5px' }}>💼 {expert.experience} years</p>
            <p style={{ color: '#f59e0b', marginBottom: '10px' }}>⭐ {expert.rating}/5</p>
            <button style={{
              background: '#2563eb', color: 'white', border: 'none',
              padding: '8px 16px', borderRadius: '8px', width: '100%'
            }}>View Profile</button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '25px' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc' }}>Previous</button>
          <span style={{ padding: '8px 16px' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc' }}>Next</button>
        </div>
      )}
    </div>
  )
}