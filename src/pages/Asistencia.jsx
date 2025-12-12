import React, { useState } from 'react'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import './Asistencia.css'

const Asistencia = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('no-asistentes') // todos, asistentes, no-asistentes
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedParticipante, setSelectedParticipante] = useState(null)

  // Datos simulados
  const [participantes, setParticipantes] = useState([
    { id: 1, name: 'Juan Pérez', dni: '12345678', email: 'juan@ejemplo.com', tipo: 'Estudiante', certificado: 'Sí', asistencia: true },
    { id: 2, name: 'María García', dni: '87654321', email: 'maria@ejemplo.com', tipo: 'Profesional', certificado: 'Sí', asistencia: true },
    { id: 3, name: 'Carlos López', dni: '11223344', email: 'carlos@ejemplo.com', tipo: 'Estudiante', certificado: 'No', asistencia: false },
    { id: 4, name: 'Ana Martínez', dni: '44332211', email: 'ana@ejemplo.com', tipo: 'Profesional', certificado: 'Sí', asistencia: true },
    { id: 5, name: 'Pedro Sánchez', dni: '55667788', email: 'pedro@ejemplo.com', tipo: 'Estudiante', certificado: 'No', asistencia: false },
  ])

  const totalAsistencia = participantes.filter(p => p.asistencia).length
  const totalParticipantes = participantes.length
  const porcentajeAsistencia = Math.round((totalAsistencia / totalParticipantes) * 100)

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

  const confirmToggleAsistencia = () => {
    if (!selectedParticipante) return

    setParticipantes(participantes.map(p =>
      p.id === selectedParticipante.id ? { ...p, asistencia: !p.asistencia } : p
    ))
    setModalOpen(false)
    setSelectedParticipante(null)
  }

  return (
    <div className="asistencia-page">
      {modalOpen && selectedParticipante && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Confirmar Acción</h3>
            <p className="modal-text">
              ¿Estás seguro de que deseas marcar como <strong>{selectedParticipante.asistencia ? 'Ausente' : 'Presente'}</strong> a <strong>{selectedParticipante.name}</strong>?
            </p>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className={`btn ${selectedParticipante.asistencia ? 'btn-danger' : 'btn-success'}`}
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
              <th>Certificado</th>
              <th>Asistencia</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipantes.map((participante) => (
              <tr key={participante.id}>
                <td>{participante.name}</td>
                <td>{participante.dni}</td>
                <td>{participante.email}</td>
                <td>
                  <span className={`badge ${participante.tipo === 'Profesional' ? 'badge-purple' : 'badge-info'}`}>{participante.tipo}</span>
                </td>
                <td>
                  <span className={`badge ${participante.certificado === 'Sí' ? 'badge-success' : 'badge-gray'}`}>
                    {participante.certificado}
                  </span>
                </td>
                <td>
                  <span className={`badge ${participante.asistencia ? 'badge-success' : 'badge-danger'}`}>
                    {participante.asistencia ? 'Presente' : 'Ausente'}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${participante.asistencia ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleToggleAsistencia(participante)}
                  >
                    {participante.asistencia ? (
                      <>
                        <FiXCircle /> Marcar Ausente
                      </>
                    ) : (
                      <>
                        <FiCheckCircle /> Marcar Asistencia
                      </>
                    )}
                  </button>
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


