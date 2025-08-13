const URL = "./modelo/";

let model, webcam, labelContainer, maxPredictions;
let isModelLoaded = false;
let isCameraActive = false;

async function init() {
    try {
        const statusElement = document.getElementById('status');
        statusElement.textContent = 'Cargando modelo...';
        statusElement.className = 'status loading';

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        isModelLoaded = true;
        statusElement.textContent = 'Modelo cargado correctamente. Listo para detectar asistencia.';
        statusElement.className = 'status ready';
        
        document.getElementById('start-btn').disabled = false;
        
        console.log('Modelo cargado con', maxPredictions, 'clases');
    } catch (error) {
        console.error('Error cargando el modelo:', error);
        const statusElement = document.getElementById('status');
        statusElement.textContent = 'Error cargando el modelo. Verifica que los archivos estén en la carpeta "modelo".';
        statusElement.className = 'status error';
    }
}

async function startCamera() {
    if (!isModelLoaded) {
        alert('El modelo aún no se ha cargado completamente');
        return;
    }

    try {
        const flip = true;
        webcam = new tmImage.Webcam(224, 224, flip);
        await webcam.setup();
        await webcam.play();
        
        isCameraActive = true;
        document.getElementById('start-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
        
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '<p>Detectando rostros...</p>';
        
        window.requestAnimationFrame(loop);
        
        console.log('Cámara iniciada correctamente');
    } catch (error) {
        console.error('Error al iniciar la cámara:', error);
        alert('Error al acceder a la cámara. Verifica los permisos.');
    }
}

function stopCamera() {
    if (webcam) {
        webcam.stop();
        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = '';
        isCameraActive = false;
        
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
        
        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = '<p>Cámara detenida. Presiona "Activar Cámara" para continuar.</p>';
        
        console.log('Cámara detenida');
    }
}

async function loop() {
    if (isCameraActive && webcam) {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }
}

async function predict() {
    if (!model || !webcam) return;
    
    try {
        const prediction = await model.predict(webcam.canvas);
        
        let highestPrediction = { className: '', probability: 0 };
        
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability > highestPrediction.probability) {
                highestPrediction = { className: prediction[i].className, probability: prediction[i].probability };
            }
        }
        
        if (highestPrediction.probability > 0.5) {
            labelContainer.innerHTML = `<div style="text-align: center; padding: 30px; background-color: #28a745; color: white; border-radius: 15px; font-size: 32px; font-weight: bold; margin: 20px 0;">
                ${highestPrediction.className}
            </div>`;
        } else {
            labelContainer.innerHTML = `<div style="text-align: center; padding: 30px; background-color: #6c757d; color: white; border-radius: 15px; font-size: 24px; margin: 20px 0;">
                No detectado
            </div>`;
        }
        
    } catch (error) {
        console.error('Error en la predicción:', error);
        labelContainer.innerHTML = '<p style="color: red;">Error en la detección</p>';
    }
}

function updateClassNames() {
    const class1Name = document.getElementById('class1-name').value || 'Persona 1';
    const class2Name = document.getElementById('class2-name').value || 'Persona 2';
    
    localStorage.setItem('class1Name', class1Name);
    localStorage.setItem('class2Name', class2Name);
    
    console.log('Nombres actualizados:', class1Name, class2Name);
}

window.addEventListener('load', () => {
    init();
});

window.addEventListener('beforeunload', () => {
    if (webcam) {
        webcam.stop();
    }
});