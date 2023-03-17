import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import * as dat from 'dat.gui';
import{OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import{MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';

// scene;
const scene1 = new THREE.Scene();

// import;
// const OBJLoader = new OBJLoader();

const mtlLoader = new MTLLoader();
    mtlLoader.load('./src/bugatti.mtl', (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      // mtl.materials.Material.side = THREE.DoubleSide;
      objLoader.setMaterials(mtl);
      objLoader.load('./src/bugatti.obj', (root) => {
        scene1.add(root);
      });
    });

    
// add meshes;
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color:'violet'});
material.roughness = 0.35;
const box1 = new THREE.Mesh(geometry, material);
scene1.add(box1);

// position x, y, z;
box1.position.set(0.5, 0.75, 0.25);
// box1.scale.x = 2.5;
// box1.scale.y = 0.5;
// box1.scale.z = 1.5;
box1.scale.set(2.5, 2.5, 2.5);

// rotate函数的运算顺序不同；
box1.rotation.reorder('YXZ');
// rotate meshes;
/*
box1.rotation.y = 0.6;
box1.rotation.x = 0.75;
*/

// size settings;
const size = {
    width: 800,
    height: 800
}

// add camera;
const aspectRatio = size.width / size.height;
const camera1 = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);  // Generally, 45 degree.
/*
const camera2 = new THREE.OrthographicCamera(
  -1 * aspectRatio, 
  1 * aspectRatio, 
  1, 
  -1, 
  0.1, 
  1000
);
*/
camera1.position.x = 2;
camera1.position.y = 2;
camera1.position.z = 2;
// camera2.position.x = 2;
// camera2.position.y = 2;
// camera2.position.z = 2;
scene1.add(camera1);
// scene1.add(camera2);

camera1.lookAt(box1.position);
// camera1.lookAt(new THREE.Vector3(3, 0, 0));
// camera2.lookAt(box1.position);

// add light;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene1.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
scene1.add(directionalLight);
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.25);
scene1.add(hemisphereLight);

// renderer;
const canvas1 = document.querySelector('.webgl1');
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas1
})
renderer.setSize(size.width, size.height);

// orbit controls;
const orb = new OrbitControls(camera1, renderer.domElement);
// const orb = new OrbitControls(camera2, renderer.domElement);

// Anim;
function Anim(time){
    orb.update();
    renderer.render(scene1,camera1);
    // renderer.render(scene1,camera2);
}
renderer.setAnimationLoop(Anim)
