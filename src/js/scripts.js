import $ from 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

let scene, camera, renderer, orbit, cFocus;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
scene.add(camera);
camera.position.set(50, 50, 70);
camera.lookAt(0, 0, 0);

const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
scene.add(camera2);
camera2.position.set(0, 8, 20);

orbit = new OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true;
orbit.autoRotateSpeed = 0.7;
orbit.enableDamping = true;
orbit.enablePan = false;
orbit.update();

// Floor Plane
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(300, 50);
scene.add(gridHelper);

// Rail
const rail1Geometry = new THREE.BoxGeometry(1000, 1, 1);
const rail1Material = new THREE.MeshStandardMaterial({color: 0x606060});
const rail1 = new THREE.Mesh(rail1Geometry, rail1Material);
scene.add(rail1);
rail1.position.set(0, 0, 4);

const rail2Geometry = new THREE.BoxGeometry(1000, 1, 1);
const rail2Material = new THREE.MeshStandardMaterial({color: 0x606060});
const rail2 = new THREE.Mesh(rail2Geometry, rail2Material);
scene.add(rail2);
rail2.position.set(0, 0, -4);

// Train Engine
const trainGeometry = new THREE.BoxGeometry(25, 12, 12);
const trainMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    visible: true
});
const train = new THREE.Mesh(trainGeometry, trainMaterial);
scene.add(train);
train.position.set(32, 7, 0);
train.castShadow = true;

// Train Car / Box
const carGeometry = new THREE.BoxGeometry(30, 10, 12);
const carMaterial = new THREE.MeshStandardMaterial({
    color: 0xe50505,
    visible: true
});
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);
car.position.set(0, 6, 0);
car.castShadow = true;

// Train Car2 / Box
const car2Geometry = new THREE.BoxGeometry(30, 10, 12);
const car2Material = new THREE.MeshStandardMaterial({
    color: 0x193569,
    visible: true
});
const car2 = new THREE.Mesh(car2Geometry, car2Material);
scene.add(car2);
car2.position.set(-35, 6, 0);
car2.castShadow = true;

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-100, 100, 100);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;

// Helpers (adds guide lines)
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

// Fog & ambient light
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

scene.fog = new THREE.FogExp2(0xFFFFFF, 0.003);

// BG
renderer.setClearColor(0x8bb7ed);

// GUI
const gui = new dat.GUI();

const options = {
    car1Color: '#e50505',
    visible: true,
    car2Color: '#193569',
    visible: true
};
gui.addColor(options, 'car1Color').onChange(function(e) {
    car.material.color.set(e);
});
gui.add(options, 'visible').onChange(function(e) {
    car.material.visible = e;
});
gui.addColor(options, 'car2Color').onChange(function(e) {
    car2.material.color.set(e);
});
gui.add(options, 'visible').onChange(function(e) {
    car2.material.visible = e;
});

// STUFF FOR MOUSE SELECTION BUT NOT WORKING CUZ OF RAYCASTER THINGY
// const mousePosition = new THREE.Vector2();

// window.addEventListener('mousemove', function(e) {
//     mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
//     mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
// });

// orbit.keys = {
//     LEFT: 'ArrowLeft',
//     UP: 'ArrowUp',
//     RIGHT: 'ArrowRight',
//     BOTTOM: 'ArrowDown'
// }
// orbit.listenToKeyEvents(window);

let currCam = camera;
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ) {
        orbit.autoRotate = !orbit.autoRotate;
        if(orbit.autoRotate == true) {
            currCam = camera;
        }
        if(orbit.autoRotate == false) {
            camera2.position.x = 32;
            currCam = camera2;
        } 
    }
    if(currCam == camera2) {
        // left arrow key
        if (e.keyCode == 37) {
            camera2.position.x -= 32;
        }
        // right arrow key
        if (e.keyCode == 39) {
            camera2.position.x += 32;
        }
    }
}

function animate(time) {
    orbit.update();

    renderer.render(scene, currCam);
}
renderer.setAnimationLoop(animate);

// Allows the window to resize/scale as needed
window.addEventListener('resize', function() {
    currCam.aspect = window.innerWidth / window.innerHeight;
    currCam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
