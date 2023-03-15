//import modules
import $ from 'jquery'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';

//create scene
const scene = new THREE.Scene();

//set renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//set camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000
);
camera.position.set( 0,-18,10 );
scene.add(camera);


//add light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
//directionalLight.position.set(1,0.25,0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.2);
scene.add(hemisphereLight);

//import model loader

const loader = new GLTFLoader();
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
);

//add material to the mesh
const material = new THREE.MeshStandardMaterial({color: 'green'});
material.roughness = 0.4;
const boxGeometry = new THREE.BoxGeometry(40, 20, 1);
const box = new THREE.Mesh(boxGeometry, material);
box.position.set(0, 0, 0);
//scene.add(box);

const controls = new OrbitControls( camera, renderer.domElement );
//add axis helper
const axesHelper = new THREE.AxesHelper(30);
scene.add( axesHelper );

function animate(time) {
    controls.update();
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
