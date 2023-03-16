//import modules
import $ from 'jquery'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import car1Image from '../../assets/treep5.png';
import * as dat from 'dat.gui';

let canvas,scene, camera, renderer, orbit, imagetest;

canvas = document.querySelector('canvas.webgl');

scene = new THREE.Scene();

imagetest = require ('../../assets/treep5.png');

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
camera.position.set(30, 30, 50);



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

//texture

var car1texture = new THREE.TextureLoader().load(imagetest);
//console.log(car1texture);
var car1Material = [
    new THREE.MeshStandardMaterial({ color:0xe50505 }),
    new THREE.MeshStandardMaterial({  color: 0xe50505 }),
    new THREE.MeshStandardMaterial({  color: 0xe50505 }),
    new THREE.MeshStandardMaterial({ color: 0xe50505 }),
    new THREE.MeshStandardMaterial({ map: car1texture ,transparent:true, side:THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0xe50505 }),
]

// Train Car / Box
const carGeometry = new THREE.BoxGeometry(30, 12, 12);
const carMaterial = new THREE.MeshStandardMaterial({
    color: 0xe50505,
    visible: true
});
//const car1Material = new THREE.MeshBasicMaterial({map: car1texture});

const car = new THREE.Mesh(carGeometry, car1Material);
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

//add light to the scene
const ambientLight = new THREE.AmbientLight(0x222222, 0.5);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-100, 100, 100);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.2);
scene.add(hemisphereLight);

//import model loader

/*const loader = new GLTFLoader();
loader.load(
    'src\js\TH.glb',
	// called when the resource is loaded
	function ( gltf ) {
		scene.add( gltf.scene );
		//gltf.animations; // Array<THREE.AnimationClip>
		//gltf.scene; // THREE.Group
		//gltf.scenes; // Array<THREE.Group>
		//gltf.cameras; // Array<THREE.Camera>
		//gltf.asset; // Object
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);*/
orbit = new OrbitControls(camera, renderer.domElement);

// Helpers (adds guide lines)
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);



function animate(time) {
    // box.rotation.x = time / 1000;
    // box.rotation.y = time / 1000;
    orbit.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
