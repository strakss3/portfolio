import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// 2. Caméra
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(3, 3, 5);

// 3. Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Lumières (sans lumière, le modèle apparaît noir)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// 5. Contrôles de caméra à la souris (pratique pour tester)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 6. Chargement du modèle
const loader = new GLTFLoader();
loader.load(
    'modele.glb',
    function (gltf) {
        scene.add(gltf.scene);
        console.log('Modèle chargé avec succès');
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    function (error) {
        console.error('Erreur de chargement :', error);
    }
);

// 7. Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 8. Gestion du redimensionnement de fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});