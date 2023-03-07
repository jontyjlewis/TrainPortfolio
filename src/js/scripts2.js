// Import Three.js
import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color to dark grey
renderer.setClearColor(0x222222);

// Add a soft white light source to the upper left of the screen
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(-1, 1, 1);
scene.add(light);

// Create the cube and spheres
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshLambertMaterial({ color: 0xd0d0d0 });
const cube = new THREE.Mesh(cubeGeometry, material);
const sphere1 = new THREE.Mesh(sphereGeometry, material);
const sphere2 = new THREE.Mesh(sphereGeometry, material);

scene.add(cube);
scene.add(sphere1);
scene.add(sphere2);

// Position the cube and spheres
cube.position.set(0, 0, 0);
sphere1.position.set(-0.5 * window.innerWidth / window.innerHeight, 0, -0.5);
sphere2.position.set(0.5 * window.innerWidth / window.innerHeight, 0, -0.5);

// Set up the mouse rotation controls
// const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Set up the keyboard controls
let spacePressed = false;
const leftKey = 37;
const rightKey = 39;

document.onkeydown = function(e) {
  if (event.keycode == leftKey) {
    camera.translateX(-window.innerWidth);
    console.log('0');
  } else if (event.keycode == rightKey) {
    camera.translateX(window.innerWidth);
    console.log('1');
  }
};

document.addEventListener('keyup', event => {
  if (event.keycode == 32) {
    spacePressed = !spacePressed;
    if (spacePressed) {
      camera.position.set(0, 0, 5);
    }
  }
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
