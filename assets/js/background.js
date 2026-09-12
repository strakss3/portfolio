import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08080f);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Données des particules
const N = 500;
const positions = new Float32Array(N * 3);
const particlesData = [];

for (let i = 0; i < N; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

    particlesData.push({
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.08 + 0.002),
        offset: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 0.008,
        tx: 0, ty: 0,
        forming: false
    });
}

// Géométrie Three.js
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0x8888ff,
    size: 0.06,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Fonctions de forme
function getCircleTargets(n) {
    const targets = [];
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2;
        targets.push({ x: Math.cos(angle) * 3, y: Math.sin(angle) * 3 });
    }
    return targets;
}

function getWaveTargets(n) {
    const targets = [];
    for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 4;
        targets.push({
            x: (i / n - 0.5) * 10,
            y: Math.sin(t) * 2
        });
    }
    return targets;
}

function setShape(shape) {
    let targets = [];
    if (shape === 'circle') targets = getCircleTargets(N);
    if (shape === 'wave')   targets = getWaveTargets(N);

    particlesData.forEach((d, i) => {
        d.tx = targets[i].x;
        d.ty = targets[i].y;
        d.forming = true;
    });
}

function resetShape() {
    particlesData.forEach(d => d.forming = false);
}

// Boutons HTML
document.getElementById('btn-circle')?.addEventListener('click', () => setShape('circle'));
document.getElementById('btn-wave')?.addEventListener('click',   () => setShape('wave'));
document.getElementById('btn-reset')?.addEventListener('click',  () => resetShape());

// Boucle d'animation
let t = 0;
function animate() {
    requestAnimationFrame(animate);
    t += 0.01;

    for (let i = 0; i < N; i++) {
        const d = particlesData[i];

        if (d.forming) {
            positions[i * 3]     += (d.tx - positions[i * 3])     * 0.05;
            positions[i * 3 + 1] += (d.ty - positions[i * 3 + 1]) * 0.05;
        } else {
            positions[i * 3]     += d.vx + Math.sin(t + d.offset) * d.amplitude;
            positions[i * 3 + 1] += d.vy;

            console.log(positions[i*3+1]);
            if (positions[i * 3 + 1] > 5)  {
                
                positions[i * 3 + 1] = -5;
            }
            if (positions[i * 3]     > 5)   positions[i * 3]     = -5;
            if (positions[i * 3]     < -5)  positions[i * 3]     =  5;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});