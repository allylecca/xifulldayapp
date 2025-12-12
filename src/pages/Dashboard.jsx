import React, { useState, useEffect } from 'react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { FiUsers, FiCheckCircle } from 'react-icons/fi'
import { attendanceService } from '../services/attendanceService'
import './Dashboard.css'

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalParticipantes: 0,
    asistieron: 0,
    noAsistieron: 0,
    tasaAsistencia: 0,
    estudiantes: { total: 0, asistieron: 0 },
    profesionales: { total: 0, asistieron: 0 }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [registrations, attendanceRecords] = await Promise.all([
        attendanceService.getParticipants(),
        attendanceService.getAllAttendance()
      ])

      // Process data
      const totalParticipantes = registrations.length
      
      // Determine attendance
      // attendanceRecords might contain duplicates or multiple check-ins, we should unique by registrationId if needed
      // But simpler is to check if ID exists in attendanceRecords
      const attendeeIds = new Set(attendanceRecords.map(r => r.registrationId))
      const asistieron = attendeeIds.size
      const noAsistieron = totalParticipantes - asistieron
      
      // Breakdown by type
      let estTotal = 0, estAsist = 0
      let profTotal = 0, profAsist = 0

      registrations.forEach(reg => {
        const isStudent = reg.type === 'STUDENT'
        const isProfessional = reg.type === 'PROFESSIONAL'
        const isPresent = attendeeIds.has(reg.id)

        if (isStudent) {
          estTotal++
          if (isPresent) estAsist++
        } else if (isProfessional) {
          profTotal++
          if (isPresent) profAsist++
        }
      })

      setStats({
        totalParticipantes,
        asistieron,
        noAsistieron,
        tasaAsistencia: totalParticipantes > 0 ? Math.round((asistieron / totalParticipantes) * 100) : 0,
        estudiantes: { total: estTotal, asistieron: estAsist },
        profesionales: { total: profTotal, asistieron: profAsist }
      })

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Error al cargar datos del dashboard.')
    } finally {
      setLoading(false)
    }
  }

  // 1. Gráfico de barras de asistencia (Asistieron vs No asistieron)
  const asistenciaGeneralData = {
    labels: ['Asistieron', 'No Asistieron'],
    datasets: [
      {
        label: 'Participantes',
        data: [stats.asistieron, stats.noAsistieron],
        backgroundColor: ['#023E55', '#e2e8f0'],
        borderRadius: 8,
      },
    ],
  }

  // 2. Tipo de asistencia: Estudiantes vs Profesionales (Asistieron vs Total)
  const tipoAsistenciaData = {
    labels: ['Estudiantes', 'Profesionales'],
    datasets: [
      {
        label: 'Asistieron',
        data: [stats.estudiantes.asistieron, stats.profesionales.asistieron],
        backgroundColor: '#F7AF02',
        borderRadius: 4,
      },
      {
        label: 'Total',
        data: [stats.estudiantes.total, stats.profesionales.total],
        backgroundColor: '#023E55',
        borderRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            family: 'Poppins',
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
      },
    },
  }

  if (loading) return <div className="loading-container">Cargando Dashboard...</div>
  if (error) return <div className="error-container">{error}</div>

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="bento-grid">
        {/* Card 1: Participantes */}
        <div className="bento-card stat-card card-participantes">
          <div className="stat-icon-container">
            <FiUsers className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Participantes</span>
            <span className="stat-number">{stats.totalParticipantes}</span>
          </div>
        </div>

        {/* Card 2: Tasa de Asistencia */}
        <div className="bento-card stat-card card-tasa">
          <div className="stat-icon-container warning">
            <FiCheckCircle className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tasa de Asistencia</span>
            <span className="stat-number">{stats.tasaAsistencia}%</span>
          </div>
        </div>

        {/* Card 3: Gráfico Asistencia General */}
        <div className="bento-card chart-card card-grafico-asistencia">
          <h3 className="card-title">Asistencia General</h3>
          <div className="chart-wrapper">
            <Bar data={asistenciaGeneralData} options={chartOptions} />
          </div>
        </div>

        {/* Card 4: Tipo de Asistencia */}
        <div className="bento-card chart-card card-tipo-asistencia">
          <h3 className="card-title">Por Tipo de Participante</h3>
          <div className="chart-wrapper">
            <Bar data={tipoAsistenciaData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


