import $ from 'jquery';
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';


// Train[100];
// Train ({Model: dfasjkdfhjkaModel, position: (0,2,4),})
// if(!Paused){
///     Train[i].position.x++;
/// }

const canvas = document.querySelector('.webgl');
let scene, camera, renderer, orbit;

// models imports
let trainHead, tree1;
trainHead = require('../assets/TrainHeadLit.glb');
tree1 = require('../assets/Tree1.glb');

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
camera.position.set(30, 30, 50);

orbit = new OrbitControls(camera, renderer.domElement);
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


// Train Front Test
const loader = new GLTFLoader();




// Loading models
// Train Head
loader.load( trainHead, function ( gltf ) {
    
	const trainHeadModel = gltf.scene;
    trainHeadModel.metalness = 1;
    trainHeadModel.scale.set(4,4,4);
    scene.add(trainHeadModel);
    trainHeadModel.position.set(-65, 0, 0);
    trainHeadModel.castShadow = true;
    trainHeadModel.rotateY(-3.14159/2);

}, undefined, function ( error ) {
	console.error( error );
});
// Tree1
let tree1Model;
loader.load( tree1, function ( gltf ) {
    tree1Model = gltf.scene;
    scene.add(tree1Model);
    tree1Model.position.set(0, 0, 10);
    tree1Model.castShadow = true;
    tree1Model.scale.set(4,4,4);
}, undefined, function ( error ) {
	console.error( error );
});





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

// Directional Light Messing --- with values here ~Skyler
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 10);
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
const ambientLight = new THREE.AmbientLight(0x222222, 1.6);
scene.add(ambientLight);

scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001);

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

function animate(time) {
    // box.rotation.x = time / 1000;
    // box.rotation.y = time / 1000;
    
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);