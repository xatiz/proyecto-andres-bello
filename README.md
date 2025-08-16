# 🔍 Reconocimiento de Objetos con TensorFlow.js

Aplicación web para reconocimiento de objetos en tiempo real usando TensorFlow.js y Teachable Machine.

## 🚀 Características

- ✅ Reconocimiento de objetos en tiempo real
- 📷 Acceso a cámara web
- 🎛️ Controles de activar/desactivar
- 🔒 Servidor HTTPS con SSL
- 🎨 Interfaz moderna con fondo celeste
- 📊 Visualización de confianza de predicciones

## 📋 Requisitos

- Node.js (v14 o superior)
- Navegador web moderno con soporte para WebRTC
- Cámara web conectada

## 🛠️ Instalación y Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Generar certificados SSL:**
   ```bash
   npm run generate-certs
   ```

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```

4. **Abrir en el navegador:**
   - Ir a: `https://localhost:3000`
   - Aceptar la advertencia de certificado auto-firmado
   - Permitir acceso a la cámara cuando se solicite

## 🎯 Uso

1. **Activar Cámara:** Hacer clic en "🚀 Activar Cámara"
2. **Reconocimiento:** El modelo detectará automáticamente los objetos
3. **Desactivar:** Hacer clic en "⏹️ Desactivar Cámara" para parar

## 🤖 Modelo

El modelo está entrenado para reconocer:
- Minion
- Mario
- Pochaco
- Nadota

## 🔧 Estructura del Proyecto

```
proyecto-andres-bello/
├── index.html          # Página principal
├── server.js           # Servidor HTTPS
├── package.json        # Dependencias
├── generate-certs.js   # Generador de certificados
├── certificates/       # Certificados SSL (auto-generados)
└── modeloo/           # Modelo de TensorFlow
    ├── model.json
    ├── weights.bin
    └── metadata.json
```

## 🌐 HTTPS y SSL

La aplicación requiere HTTPS para acceder a la cámara. Los certificados se generan automáticamente para desarrollo local.

⚠️ **Nota:** Los certificados auto-firmados solo son para desarrollo. Para producción, usa certificados válidos.

## 🎨 Personalización

- **Colores:** Edita los estilos CSS en `index.html`
- **Modelo:** Reemplaza los archivos en `modeloo/` con tu propio modelo
- **Puerto:** Cambia el puerto en `server.js`

## 📱 Navegadores Compatibles

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 🐛 Solución de Problemas

### Error de certificados SSL
```bash
npm run generate-certs
```

### Cámara no detectada
- Verificar permisos del navegador
- Comprobar que la cámara esté conectada
- Reiniciar el navegador

### Modelo no carga
- Verificar que existan los archivos en `modeloo/`
- Comprobar la consola del navegador para errores

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu característica
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## 📄 Licencia

MIT License - ver el archivo LICENSE para detalles.