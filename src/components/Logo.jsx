import React from 'react'
import './Logo.css'

const Logo = ({ size = 'large' }) => {
  // Rutas de la imagen del logo (intenta diferentes formatos)
  const logoSrc = '/images/logo.png'
  const logoSrcSvg = '/images/logo.svg'
  const logoSrcJpg = '/images/logo.jpg'
  const logoSrcWebp = '/images/logo.webp'
  
  const [imageError, setImageError] = React.useState(false)
  const [currentSrc, setCurrentSrc] = React.useState(logoSrc)

  const handleImageError = () => {
    // Intentar otros formatos
    if (currentSrc === logoSrc) {
      setCurrentSrc(logoSrcSvg)
    } else if (currentSrc === logoSrcSvg) {
      setCurrentSrc(logoSrcJpg)
    } else if (currentSrc === logoSrcJpg) {
      setCurrentSrc(logoSrcWebp)
    } else {
      setImageError(true)
    }
  }

  // Si es tamaño icon (sidebar cerrado), mostrar solo el gráfico
  if (size === 'icon') {
    return (
      <div className="logo-container icon">
        <img 
          src={currentSrc} 
          alt="FULL DAY"
          className="logo-image-icon"
          onError={handleImageError}
        />
        {imageError && (
          <div className="logo-icon-fallback">
            <div className="logo-bar logo-bar-yellow"></div>
            <div className="logo-bar logo-bar-cyan"></div>
            <div className="logo-bar logo-bar-blue"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`logo-container ${size}`}>
      <img 
        src={currentSrc} 
        alt="FULL DAY - Gestión de TI 2025"
        className={`logo-image logo-image-${size}`}
        onError={handleImageError}
      />
      {imageError && (
        <div className="logo-text-fallback">
          <div className="logo-main-text">FULL DAY</div>
          <div className="logo-sub-text">GESTIÓN DE TI 2025</div>
        </div>
      )}
    </div>
  )
}

export default Logo

