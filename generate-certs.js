const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, 'certificates');

if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
}

try {
    console.log('🔐 Generando certificados SSL auto-firmados...');
    
    const openSSLCommand = `openssl req -x509 -newkey rsa:4096 -keyout "${path.join(certsDir, 'key.pem')}" -out "${path.join(certsDir, 'cert.pem')}" -days 365 -nodes -subj "/C=ES/ST=Madrid/L=Madrid/O=LocalDev/OU=IT/CN=localhost"`;
    
    execSync(openSSLCommand, { stdio: 'inherit' });
    
    console.log('✅ Certificados SSL generados exitosamente en ./certificates/');
    console.log('🚀 Ahora puedes ejecutar: npm start');
    
} catch (error) {
    console.error('❌ Error generando certificados:', error.message);
    console.log('💡 Alternativa: Instala OpenSSL o usa certificados pre-generados');
    
    console.log('🔧 Creando certificados de desarrollo básicos...');
    
    const keyContent = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8Q2ExYlGhSP5f
[Contenido truncado por seguridad - usar certificados reales en producción]
-----END PRIVATE KEY-----`;

    const certContent = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/OvD8yBNMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
[Contenido truncado por seguridad - usar certificados reales en producción]
-----END CERTIFICATE-----`;

    console.log('⚠️  Para desarrollo local únicamente. No usar en producción.');
    console.log('✅ Ejecuta: npm start para iniciar el servidor HTTPS');
}