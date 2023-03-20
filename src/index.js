import $ from 'jquery';
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from 'gsap';

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
// camera.position.set(30, 30, 50);
camera.position.set(20,20,100);

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

const textposition1 = new THREE.Vector3();
const followText1 = document.getElementById('follow-text-one');
const textposition2 = new THREE.Vector3();
const followText2 = document.getElementById('follow-text-two');
const textposition3 = new THREE.Vector3();
const followText3 = document.getElementById('follow-text-three');

const followTextArray = [followText1, followText2, followText3];

canvas = document.querySelector('canvas');

document.body.onkeydown = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ) {
        orbit.autoRotate = !orbit.autoRotate;
        if(orbit.autoRotate == true) {
            currCam = camera;
            hideText(followText1);
            hideText(followText2);
            hideText(followText3);
        }
        if(orbit.autoRotate == false) {

            currCam = camera2;
            showText(followTextArray[objPtr]);
            

        } 
    }
    if(currCam == camera2) {
        // left arrow key
        if (e.keyCode == 37) {
            if(objPtr > 0) {
                objPtr--;
                camera2.position.x = objArray[objPtr].position.x;
            }
            for (let i = 0; i < followTextArray.length; i++){
                if (i == objPtr){
                    showText(followTextArray[i]);
                }
                else{
                    hideText(followTextArray[i]);
                }
            }
        }
        // right arrow key
        if (e.keyCode == 39) {
            if(objPtr < objArray.length) {
                objPtr++;
                camera2.position.x = objArray[objPtr].position.x;
            }
            for (let i = 0; i < followTextArray.length; i++){
                if (i == objPtr){
                    showText(followTextArray[i]);
                }
                else{
                    hideText(followTextArray[i]);
                }
            }
        }
    }
}


function animate(time) {
    orbit.update();
    addFollowText(textposition1, followText1, car2, camera2, canvas);
    addFollowText(textposition2, followText2, car, camera2, canvas);
    addFollowText(textposition3, followText3, train, camera2, canvas);
    
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