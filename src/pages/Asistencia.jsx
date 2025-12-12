import React, { useState, useEffect } from 'react'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { attendanceService } from '../services/attendanceService'
import './Asistencia.css'

const Asistencia = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('no-asistentes') // todos, asistentes, no-asistentes
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedParticipante, setSelectedParticipante] = useState(null)
  const [participantes, setParticipantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const registrations = await attendanceService.getParticipants()

      // Map registrations to include attendance status
      const mappedParticipantes = registrations.map(reg => {
        return {
          id: reg.id,
          name: reg.fullName,
          dni: reg.documentNumber,
          email: reg.email,
          tipo: reg.type === 'PROFESSIONAL' ? 'Profesional' : 'Estudiante',
          asistencia: !!reg.attendance
        }
      })

      setParticipantes(mappedParticipantes)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Error al cargar los datos. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const totalAsistencia = participantes.filter(p => p.asistencia).length
  const totalParticipantes = participantes.length
  const porcentajeAsistencia = totalParticipantes > 0 ? Math.round((totalAsistencia / totalParticipantes) * 100) : 0

  let filteredParticipantes = participantes.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.dni.includes(searchTerm) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (filter === 'asistentes') {
    filteredParticipantes = filteredParticipantes.filter(p => p.asistencia)
  } else if (filter === 'no-asistentes') {
    filteredParticipantes = filteredParticipantes.filter(p => !p.asistencia)
  }

  const handleToggleAsistencia = (participante) => {
    setSelectedParticipante(participante)
    setModalOpen(true)
  }

  const confirmToggleAsistencia = async () => {
    if (!selectedParticipante) return

    try {
      if (!selectedParticipante.asistencia) {
        // Mark as present
        await attendanceService.registerAttendance(selectedParticipante.id)
        
        // Update local state
        setParticipantes(participantes.map(p =>
          p.id === selectedParticipante.id ? { ...p, asistencia: true } : p
        ))
      }
      setModalOpen(false)
      setSelectedParticipante(null)
    } catch (err) {
      console.error('Error updating attendance:', err)
      alert('Error al actualizar la asistencia. Intenta nuevamente.')
    }
  }

  if (loading) return <div className="loading-container">Cargando datos...</div>
  if (error) return <div className="error-container">{error}</div>

  return (
    <div className="asistencia-page">
      {modalOpen && selectedParticipante && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Confirmar Acción</h3>
              <button 
                className="modal-close"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-text">
                ¿Estás seguro de que deseas marcar como <strong>Presente</strong> a <strong>{selectedParticipante.name}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-success"
                onClick={confirmToggleAsistencia}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="page-title">Asistencia</h1>

      <div className="asistencia-card">
        <div className="asistencia-header">
          <div>
            <h2 className="asistencia-title">Asistencia Total</h2>
            <p className="asistencia-subtitle">
              {totalAsistencia} de {totalParticipantes} participantes
            </p>
          </div>
          <div className="asistencia-percentage">
            {porcentajeAsistencia}%
          </div>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar"
            style={{ width: `${porcentajeAsistencia}%` }}
          />
        </div>
      </div>

      <div className="filters-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="input search-input"
            placeholder="Buscar participantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'todos' ? 'active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Todos
          </button>
          <button
            className={`filter-btn ${filter === 'asistentes' ? 'active' : ''}`}
            onClick={() => setFilter('asistentes')}
          >
            Asistentes
          </button>
          <button
            className={`filter-btn ${filter === 'no-asistentes' ? 'active' : ''}`}
            onClick={() => setFilter('no-asistentes')}
          >
            No Asistentes
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Asistencia</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipantes.map((participante) => (
              <tr key={participante.id}>
                <td data-label="Nombre">{participante.name}</td>
                <td data-label="DNI">{participante.dni}</td>
                <td data-label="Email">{participante.email}</td>
                <td data-label="Tipo">
                  <span className={`badge ${participante.tipo === 'Profesional' ? 'badge-purple' : 'badge-info'}`}>{participante.tipo}</span>
                </td>
                <td data-label="Asistencia">
                  <span className={`badge ${participante.asistencia ? 'badge-success' : 'badge-danger'}`}>
                    {participante.asistencia ? 'Presente' : 'Ausente'}
                  </span>
                </td>
                <td data-label="Acción">
                  {!participante.asistencia && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleToggleAsistencia(participante)}
                    >
                      <FiCheckCircle /> Marcar Asistencia
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Asistencia


