import * as THREE from 'three'

// create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000);

// create a camera
const camera = new THREE.PerspectiveCamera(
    75,     // fov
    innerWidth / innerHeight,
    0.1,    // near
    1000    // far
)
camera.position.set(0,0,10)

// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

//create sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({
        color : 0xFF0000
    })
)

scene.add(sphere)

// animation loop
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()