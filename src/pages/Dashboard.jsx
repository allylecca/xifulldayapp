import React from 'react'
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
  // Datos simulados
  const totalParticipantes = 450
  const asistieron = 414
  const noAsistieron = 36
  const tasaAsistencia = Math.round((asistieron / totalParticipantes) * 100)

  // 1. Gráfico de barras de asistencia (Asistieron vs No asistieron)
  const asistenciaGeneralData = {
    labels: ['Asistieron', 'No Asistieron'],
    datasets: [
      {
        label: 'Participantes',
        data: [asistieron, noAsistieron],
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
        data: [250, 164],
        backgroundColor: '#F7AF02',
        borderRadius: 4,
      },
      {
        label: 'Total',
        data: [280, 170],
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
            <span className="stat-number">{totalParticipantes}</span>
          </div>
        </div>

        {/* Card 2: Tasa de Asistencia */}
        <div className="bento-card stat-card card-tasa">
          <div className="stat-icon-container warning">
            <FiCheckCircle className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tasa de Asistencia</span>
            <span className="stat-number">{tasaAsistencia}%</span>
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


