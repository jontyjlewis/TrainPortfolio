import * as THREE from 'three';

let scene, camera, renderer;

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

function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);