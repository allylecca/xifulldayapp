import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  FiHome, 
  FiCheckSquare, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX,
  FiUser
} from 'react-icons/fi'
import Logo from './Logo'
import './Layout.css'

const Layout = ({ children, setIsAuthenticated }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/asistencia', icon: FiCheckSquare, label: 'Asistencia' },
    { path: '/ajustes', icon: FiSettings, label: 'Ajustes' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="mobile-logo">
          <Logo size="small" />
        </div>
        <div className="mobile-spacer"></div>
      </div>

      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu}></div>
      )}

      <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Logo size="small" />
          </div>
          <button className="close-sidebar-btn" onClick={closeMobileMenu}>
            <FiX />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            <FiUser />
          </div>
          <div className="user-info">
            <div className="user-name">XI Full Day</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <Icon className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            className="nav-item logout-btn"
            onClick={() => {
              closeMobileMenu()
              setShowLogoutModal(true)
            }}
            title="Cerrar Sesión"
          >
            <div className="logout-icon-container">
              <FiLogOut className="nav-icon" />
            </div>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Cerrar Sesión</h2>
              <button
                className="modal-close"
                onClick={() => setShowLogoutModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-text">
                ¿Estás seguro de que deseas cerrar sesión?
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout

