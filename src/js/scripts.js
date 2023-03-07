import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui';

let scene, camera, renderer, orbit;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10, 30, 30);

orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Floor Plane
// const planeGeometry = new THREE.PlaneGeometry(30, 30);
// const planeMaterial = new THREE.MeshStandardMaterial({
//     color: 0xFFFFFF,
//     side: THREE.DoubleSide
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);