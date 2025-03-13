const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizar = new THREE.WebGLRenderer();
renderizar.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizar.domElement);

const geometriaSol = new THREE.SphereGeometry(2);
const geometriaTierra = new THREE.SphereGeometry(1);
const geometriaLuna = new THREE.SphereGeometry(0.5);

const materialSol = new THREE.MeshBasicMaterial({ color: 0xFFFF00, wireframe: true });
const materialTierra = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: true });
const materialLuna = new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true });

const sol = new THREE.Mesh(geometriaSol, materialSol);
const tierra = new THREE.Mesh(geometriaTierra, materialTierra);
const luna = new THREE.Mesh(geometriaLuna, materialLuna);

escena.add(sol);
escena.add(tierra);
escena.add(luna);

const initialSol = { position: sol.position.clone(), rotation: sol.rotation.clone(), scale: sol.scale.clone() };
const initialTierra = { position: tierra.position.clone(), rotation: tierra.rotation.clone(), scale: tierra.scale.clone() };
const initialLuna = { position: luna.position.clone(), rotation: luna.rotation.clone(), scale: luna.scale.clone() };

camara.position.z = 10;

const translateX_Sol = document.getElementById('translateX_Sol');
const translateY_Sol = document.getElementById('translateY_Sol');
const rotateX_Sol = document.getElementById('rotateX_Sol');
const rotateY_Sol = document.getElementById('rotateY_Sol');
const scale_Sol = document.getElementById('scale_Sol');

const translateX_Tierra = document.getElementById('translateX_Tierra');
const translateY_Tierra = document.getElementById('translateY_Tierra');
const rotateX_Tierra = document.getElementById('rotateX_Tierra');
const rotateY_Tierra = document.getElementById('rotateY_Tierra');
const scale_Tierra = document.getElementById('scale_Tierra');

const translateX_Luna = document.getElementById('translateX_Luna');
const translateY_Luna = document.getElementById('translateY_Luna');
const rotateX_Luna = document.getElementById('rotateX_Luna');
const rotateY_Luna = document.getElementById('rotateY_Luna');
const scale_Luna = document.getElementById('scale_Luna');

const speedControl = document.getElementById('speedControl');

let autoRotate = false;
let rotationAngle = 0;
let rotationSpeed = parseFloat(speedControl.value);

document.getElementById('autoRotateButton').addEventListener('click', () => {
    autoRotate = !autoRotate;
    document.getElementById('autoRotateButton').textContent = autoRotate ? 'Desactivar Rotación Automática' : 'Activar Rotación Automática';
});

speedControl.addEventListener('input', () => {
    rotationSpeed = parseFloat(speedControl.value);
});

function animate() {
    requestAnimationFrame(animate);

    if (autoRotate) {
        rotationAngle += rotationSpeed;
        if (rotationAngle >= 360) rotationAngle = 0;
    }

    sol.position.x = parseFloat(translateX_Sol.value);
    sol.position.y = parseFloat(translateY_Sol.value);
    sol.rotation.x = THREE.MathUtils.degToRad(parseFloat(rotateX_Sol.value));
    sol.rotation.y = THREE.MathUtils.degToRad(parseFloat(rotateY_Sol.value));
    sol.scale.set(scale_Sol.value, scale_Sol.value, scale_Sol.value);

    tierra.position.x = parseFloat(translateX_Tierra.value);
    tierra.position.y = parseFloat(translateY_Tierra.value);
    tierra.rotation.x = THREE.MathUtils.degToRad(parseFloat(rotateX_Tierra.value));
    tierra.rotation.y = THREE.MathUtils.degToRad(parseFloat(rotateY_Tierra.value));
    tierra.scale.set(scale_Tierra.value, scale_Tierra.value, scale_Tierra.value);

    tierra.position.x = tierra.position.x + 4 * Math.cos(rotationAngle);
    tierra.position.z = 4 * Math.sin(rotationAngle);

    luna.position.x = parseFloat(translateX_Luna.value);
    luna.position.y = parseFloat(translateY_Luna.value);
    luna.rotation.x = THREE.MathUtils.degToRad(parseFloat(rotateX_Luna.value));
    luna.rotation.y = THREE.MathUtils.degToRad(parseFloat(rotateY_Luna.value));
    luna.scale.set(scale_Luna.value, scale_Luna.value, scale_Luna.value);

    luna.position.x = tierra.position.x + 1.5 * Math.cos(rotationAngle * 2);
    luna.position.z = tierra.position.z + 1.5 * Math.sin(rotationAngle * 2);

    renderizar.render(escena, camara);
}

animate();

window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizar.setSize(window.innerWidth, window.innerHeight);
});