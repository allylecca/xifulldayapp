# Aplicación Web PWA - Admin App

Aplicación web tipo PWA (Progressive Web App) para administración con diseño moderno y estética similar a aplicaciones Mac.

## Características

### 1. Login
- Pantalla de inicio de sesión con logo
- Campos de correo y contraseña con resaltado amarillo al hacer clic
- Opción de mostrar/ocultar contraseña
- Checkbox "Recuérdame"
- Enlace "¿Olvidaste la contraseña?" con modal de contacto

### 2. Sidebar
- Navegación lateral con logo, nombre de usuario y rol
- Secciones: Dashboard, Usuarios, Asistencia, Certificados, Ajustes
- Botón de cerrar sesión con modal de confirmación
- Sidebar colapsable

### 3. Dashboard
- Cards con estadísticas: Total recaudado, Participantes, Certificados, Tasa de asistencia
- Gráfico de pastel para distribución de certificados
- Gráficos de barras para asistencia por día y tipo de asistencia

### 4. Usuarios
- Barra de búsqueda
- Botón "Nuevo Usuario" con modal para agregar/editar
- Tabla con usuarios (nombre, email, rol, estado, acciones)
- Acciones: editar, activar/desactivar, ver detalles

### 5. Asistencia
- Card de asistencia total con barra de progreso
- Barra de búsqueda y filtros (todos, asistentes, no asistentes)
- Tabla con detalles de participantes
- Botón para marcar asistencia

### 6. Certificados
- Cards para certificados pendientes, validados y entregados
- Barra de búsqueda y filtros
- Tabla con detalles de certificados
- Acciones: ver detalles, validar pago, entregar certificado

### 7. Ajustes
- Card con información del usuario
- Opción de editar perfil (nombre, correo)
- Sección de seguridad para cambiar contraseña

## Diseño

- **Tipografía**: Poppins
- **Colores principales**:
  - Amarillo: #F7AF02 (iconos y botones)
  - Azul oscuro: #023E55 (textos)
- **Estilo**: Bordes suaves, diseño moderno tipo Mac

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## Tecnologías

- React 18
- React Router DOM
- Chart.js / React-Chartjs-2
- React Icons
- Vite
- Vite PWA Plugin

## Estructura del Proyecto

```
src/
├── components/
│   ├── Login.jsx
│   ├── Login.css
│   ├── Layout.jsx
│   └── Layout.css
├── pages/
│   ├── Dashboard.jsx
│   ├── Dashboard.css
│   ├── Usuarios.jsx
│   ├── Usuarios.css
│   ├── Asistencia.jsx
│   ├── Asistencia.css
│   ├── Certificados.jsx
│   ├── Certificados.css
│   ├── Ajustes.jsx
│   └── Ajustes.css
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Notas

- Los datos son simulados y se almacenan en el estado local de React
- Para producción, conectar con un backend real
- La aplicación está configurada como PWA y puede instalarse en dispositivos


