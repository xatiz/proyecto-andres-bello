const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem'))
};

https.createServer(options, app).listen(port, () => {
    console.log(`🚀 Servidor HTTPS ejecutándose en https://localhost:${port}`);
    console.log('📱 Asegúrate de permitir el acceso a la cámara cuando el navegador lo solicite');
    console.log('🔒 Certificado SSL auto-firmado - acepta la advertencia de seguridad en el navegador');
});

app.on('error', (err) => {
    if (err.code === 'ENOENT') {
        console.error('❌ Error: No se encontraron los certificados SSL');
        console.log('💡 Ejecuta: npm run generate-certs para crear los certificados');
    } else {
        console.error('❌ Error del servidor:', err);
    }
});