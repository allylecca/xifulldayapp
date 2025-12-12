import React from 'react'
import { FiUser } from 'react-icons/fi'
import './Ajustes.css'

const Ajustes = () => {
  const profileData = {
    name: 'XI Full Day',
    email: 'adminfullday@gmail.com'
  }

  return (
    <div className="ajustes-page">
      <h1 className="page-title">Ajustes</h1>

      <div className="settings-section">
        <div className="settings-card">
          <div className="profile-card-content">
            <div className="profile-avatar-container">
              <FiUser />
            </div>

            <div className="profile-text-content">
              <h3 className="profile-name">{profileData.name}</h3>
              <p className="profile-email">{profileData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ajustes

