import $ from 'jquery';
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const carts = [], carts_ipos = [];

let panSpeed = 1;
let moveSpeed = 1;
let first_random = 0;
let tree_x_density = 0;
let tree_z_density = 0;




const canvas = document.querySelector('.webgl');
let scene, camera, renderer, orbit, bounds = 2000;

// models imports
let trainHead_src, trainTracks_src, tree1_src, tree2_src, tree3_src, tree4_src, tree5_src;
trainHead_src = require('../assets/TrainHeadLit.glb');
trainTracks_src = require('../assets/TrainTracks.glb');
tree1_src = require('../assets/Tree1.glb');
tree2_src = require('../assets/Tree2.glb');
tree3_src = require('../assets/Tree3.glb');
tree4_src = require('../assets/Tree4.glb');
tree5_src = require('../assets/Tree5.glb');

// Scene Setup

scene = new THREE.Scene();
scene.background = new THREE.Color(0x88dcf4);

renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene Camera
camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
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

// ORBIT CONTROL STUFF
orbit = new OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true;
orbit.autoRotateSpeed = 0.7;
orbit.enableDamping = true;
orbit.enablePan = false;
orbit.update();

// Scene Lighting
//hemiLight = new THREE.HemisphereLight(0x88dcf4, 0x080820, .5);
//scene.add(hemiLight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;

// SHADOWS
const shadowMapSize = {
    width: 10000,
    height: 10000
}

// Floor Plane
const planeGeometry = new THREE.PlaneGeometry(10000, 10000);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x33BB33,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
plane.receiveShadow = true;


// Grid 
// const gridHelper = new THREE.GridHelper(300, 50);
// scene.add(gridHelper);


// Train Front
const loader = new GLTFLoader();
// Loading models
// Train Head
let treeModels = [];
loader.load( trainHead_src, function ( gltf ) {
	const model = gltf.scene;
    model.children[0].material.color.r = 2;
    model.children[0].material.color.g = 2;
    model.children[0].material.color.b = 2;
    scene.add(model);
    model.position.set(-73, 2.5, 0);
    model.children[0].castShadow = true;
    model.children[0].rotateY(-3.14159/2);

}, undefined, function ( error ) {
	console.error( error );
});

//Train Tracks
let trainTracks;
loader.load( trainTracks_src, function ( gltf ) {
	const model = gltf.scene;
    model.children[0].material.color.r = 2;
    model.children[0].material.color.g = 2;
    model.children[0].material.color.b = 2;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.children[0].castShadow = true;
    model.children[0].rotateZ(-3.14159/2);
    trainTracks = model;
    for(var i = 1, dist = -30, modelWidth = 120, multiplier = 1; i < 40 ; i++){
        if(-bounds+(120*i) > bounds) break;

        let newTrack = model.children[0].clone();
        newTrack.position.set(-bounds+(120*i), 0, 0);
        trainTracks.children.push(newTrack);
        newTrack.parent = trainTracks;
    }
    trainTracks.castShadow = true;
    scene.add(trainTracks);
    
}, undefined, function ( error ) {
	console.error( error );
});



// Environment Models
// Tree1
loader.load( tree1_src, function ( gltf ) {
    const model = gltf.scene;
    model.scale.set(1.5,1.5,1.5);
    model.children[0].castShadow = true;
    treeModels.push(model.children[0]);
    
}, undefined, function ( error ) {
	console.error( error );
});
// Tree2
loader.load( tree2_src, function ( gltf ) {
    const model = gltf.scene;
    model.scale.set(1.5,1.5,1.5);
    model.position.set(50, 0, -50);
    model.children[0].castShadow = true;
    treeModels.push(model.children[0]);
    
}, undefined, function ( error ) {
	console.error( error );
});

// Tree3
loader.load( tree3_src, function ( gltf ) {
    const model = gltf.scene;
    model.scale.set(1.5,1.5,1.5);
    model.position.set(75, 0, -60);
    model.children[0].castShadow = true;
    treeModels.push(model.children[0]);
    
}, undefined, function ( error ) {
	console.error( error );
});
// Tree4
loader.load( tree4_src, function ( gltf ) {
    const model = gltf.scene;
    model.scale.set(1.5,1.5,1.5);
    model.position.set(30, 0, -60);
    model.children[0].castShadow = true;
    treeModels.push(model.children[0]);
    
}, undefined, function ( error ) {
	console.error( error );
});
// Tree5
loader.load( tree5_src, function ( gltf ) {
    const model = gltf.scene;
    model.scale.set(1.5,1.5,1.5);
    model.position.set(-20, 0, -55);
    model.children[0].castShadow = true;
    treeModels.push(model.children[0]);
    
}, undefined, function ( error ) {
	console.error( error );
});




// Train Engine
const trainGeometry = new THREE.BoxGeometry(30, 10, 12);
const trainMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    visible: true
});
const train = new THREE.Mesh(trainGeometry, trainMaterial);
scene.add(train);
train.position.set(32, 8.5, 0);
train.castShadow = true;

// Train Car / Box
const carGeometry = new THREE.BoxGeometry(30, 10, 12);
const carMaterial = new THREE.MeshStandardMaterial({
    color: 0xe50505,
    visible: true
});
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);
car.position.set(0, 8.5, 0);
car.castShadow = true;

// Train Car2 / Box 
const car2Geometry = new THREE.BoxGeometry(30, 10, 12);
const car2Material = new THREE.MeshStandardMaterial({
    color: 0x193569,
    visible: true
});
const car2 = new THREE.Mesh(car2Geometry, car2Material);
scene.add(car2);
car2.position.set(-35, 8.5, 0);
car2.castShadow = true;

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-100, 100, 100);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -200;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.left = -200;
directionalLight.shadow.camera.right = 200;

directionalLight.shadow.mapSize.width = shadowMapSize.width;
directionalLight.shadow.mapSize.height = shadowMapSize.height;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Helpers (adds guide lines)
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

// Fog & ambient light
const ambientLight = new THREE.AmbientLight(0x442222, 1.6);
scene.add(ambientLight);

scene.fog = new THREE.FogExp2(0x88dcf4, 0.0005);

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


function randomizeTrees(){
    if(!first_random){
        treeModels.forEach((element) => {
            scene.add(element);
            element.position.x = getRandomInt(-120, 120);
            element.position.z = getRandomInt(-10, -100);
        });
        first_random = 1;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }


let thisTrack;


// STUFF FOR MOUSE SELECTION BUT NOT WORKING CUZ OF RAYCASTER THINGY
// const mousePosition = new THREE.Vector2();

// window.addEventListener('mousemove', function(e) {
//     mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
//     mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
// });

let currCam = camera;
let objArray = [car2, car, train];
let objPtr = 2;
camera2.position.x = train.position.x;
document.body.onkeydown = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ) {
        orbit.autoRotate = !orbit.autoRotate;
        if(orbit.autoRotate == true) {
            currCam = camera;
        }
        if(orbit.autoRotate == false) {
            currCam = camera2;
        } 
    }
    if(currCam == camera2) {
        // left arrow key
        if (e.keyCode == 37) {
            if(objPtr > 0) {
                objPtr--;
                camera2.position.x = objArray[objPtr].position.x;
            }
        }
        // right arrow key
        if (e.keyCode == 39) {
            if(objPtr < objArray.length) {
                objPtr++;
                camera2.position.x = objArray[objPtr].position.x;
            }
        }
    }
}

function animate(time) {
    orbit.update();

    const cameraY = camera.position.y;

    if (cameraY <= Math.PI / 9){
        camera.position.y = Math.PI / 9;
    }
    
    if(treeModels.length == 5){
        
       randomizeTrees(); 
       treeModels.forEach((element) => element.position.x += panSpeed);
       
       if(trainTracks != null) {
           trainTracks.position.x += panSpeed;
           thisTrack = trainTracks.children[trainTracks.children.length-1];
           console.log(thisTrack.position.x + trainTracks.position.x);
           if(thisTrack.position.x + trainTracks.position.x > bounds){
            console.log("hit");
            thisTrack.position.x = -(2*bounds)+thisTrack.position.x+40;
            trainTracks.children.pop();
            trainTracks.children.unshift(thisTrack);
            
           }
       }
       
       

    }
    renderer.render(scene, currCam);
}
renderer.setAnimationLoop(animate);

/*
function resetCarts(){
    for(let i = 0; i < carts.length && i < carts_ipos.length ; i++){
        carts[i].position.x = carts_ipos[i].x;
        carts[i].position.y = carts_ipos[i].y;
        carts[i].position.z = carts_ipos[i].z;
        
    }
}*/

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 65 || keyCode == 87 ) {
        for(let i = 0; i < carts.length ; i++){
            carts[i].position.x -= moveSpeed;
        }
    } else if (keyCode == 68 || keyCode == 83 ) {
        for(let i = 0; i < carts.length ; i++){
            carts[i].position.x += moveSpeed;
        }
    } else if (keyCode == 82){
        //resetCarts();
    }
    else if (keyCode == 32){
        Paused = false;
    }
};

// Allows the window to resize/scale as needed
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});