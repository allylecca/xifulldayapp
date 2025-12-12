import React, { useState } from 'react'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'
import Logo from './Logo'
import './Login.css'

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Credenciales por defecto
    const validCredentials = {
      email: 'adminfullday@gmail.com',
      password: 'admin123'
    }
    
    // Validar credenciales
    if (email === validCredentials.email && password === validCredentials.password) {
      setIsAuthenticated(true)
      sessionStorage.setItem('isAuthenticated', 'true')
    } else {
      alert('Credenciales incorrectas. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <Logo size="large" />
        </div>
        
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                className="input"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => setShowForgotPasswordModal(true)}
              style={{ width: '100%', textAlign: 'right' }}
            >
              ¿Olvidaste la contraseña?
            </button>
          </div>

          <button type="submit" className="btn btn-primary login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>

      {showForgotPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowForgotPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Recuperar Contraseña</h2>
              <button
                className="modal-close"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-text" style={{ marginBottom: '16px' }}>
                Para recuperar tu contraseña, por favor contacta al administrador del sistema.
              </p>
              <p className="modal-text" style={{ marginBottom: '16px' }}>
                <strong>Email:</strong> ally.lecca@icloud.com
              </p>
              <p className="modal-text">
                <strong>Teléfono:</strong> +51 961 333 083
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login

