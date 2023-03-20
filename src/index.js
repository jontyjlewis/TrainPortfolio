import $ from 'jquery';
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as dat from 'dat.gui';
import { Camera } from 'three';

import { LoadingManager } from 'three';

const carts = [], carts_ipos = [];
let dev_tool = -7;
const mixers = [];
let panSpeed = 0.1;
let moveSpeed = 1;
let objArray = [];
let first_random = 0;
let tree_x_density = 50;
let tree_z_density = 50;
let Thumbnails = [];

let loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    ),
    box: new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({color:0x4444ff})
    )
};
var LOADING_MANAGER = null;
var RESOURCES_LOADED = false;

loadingScreen.box.position.set(0,0,5);
loadingScreen.camera.lookAt(loadingScreen.box.position);
loadingScreen.scene.add(loadingScreen.box);

const manager = new THREE.LoadingManager();

manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad = function ( ) {

	console.log( 'Loading complete!');
    if(!RESOURCES_LOADED){
        camera2.position.x = trainHead.position.x;
        console.log("train");
        objArray = [trainHead, car, car2, car3, car4, car5];
        hideText(followTextArray[1]);
        Thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5];
        for(let i = 0; i < followTextArray.length; i++){
            hideText(followTextArray[i]);
        }

    }
    RESOURCES_LOADED = true;
    
    

};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};


manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};



let scene, camera, renderer, orbit, bounds = 1000;

// models imports
let trainHead_src, trainTracks_src, Cart1_src, Cart2_src, Cart3_src, Cart4_src, Cart5_src, tree1_src, tree2_src, tree3_src, tree4_src, tree5_src;
trainHead_src = require('../assets/TrainHeadUnlit.glb');
trainTracks_src = require('../assets/TrainTracks.glb');
let thumbnail1_src = require('../assets/JontyThumbnail.glb');
// thumbnail1_src = require('../assets/JontyThumbnail.glb');
// thumbnail1_src = require('../assets/JontyThumbnail.glb');

Cart1_src = require('../assets/Cart1.glb');
Cart2_src = require('../assets/Cart2.glb');
Cart3_src = require('../assets/Cart3.glb');
Cart4_src = require('../assets/Cart4.glb');
Cart5_src = require('../assets/Cart5.glb');
tree1_src = require('../assets/Tree1.glb');
tree2_src = require('../assets/Tree2.glb');
tree3_src = require('../assets/Tree3.glb');
tree4_src = require('../assets/Tree4.glb');
tree5_src = require('../assets/Tree5.glb');

// Scene Setup

scene = new THREE.Scene();
scene.background = new THREE.Color(0x88dcf4);

renderer = new THREE.WebGLRenderer({ antialias: true });
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
//camera2.position.set(0, 8, 20+(20*1-(window.innerHeight/1080)));
camera2.position.set(0, 12, 20 + 0.0135*(window.innerHeight - 1080));

/*
const cameraT = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
scene.add(cameraT);
cameraT.position.set(0, 8, 20);
*/

// ORBIT CONTROL STUFF
orbit = new OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true;
orbit.autoRotateSpeed = 0.3;
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
const loader = new GLTFLoader(manager);
// Loading models
let trainHead;
// Train Head
let treeModels = [];
loader.load( trainHead_src, function ( gltf ) {
	const model = gltf.scene;
    model.children[0].material.color.r = 2;
    model.children[0].material.color.g = 2;
    model.children[0].material.color.b = 2;
    model.position.set(-75, 2.5, 0);
    model.children[0].castShadow = true;
    trainHead = model;
    scene.add(trainHead);

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
    model.children[0].receiveShadow = true;
    model.children[0].rotateZ(-3.14159/2);
    trainTracks = model;
    for(var i = 1; i < 40 ; i++){
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


// Import thumbnail1

let thumbnail1;
loader.load( thumbnail1_src, function ( gltf ) {
    
    const model = gltf.scene;
    
    model.position.set(-35, 2.7, 3.1);   
    thumbnail1 = model;
    scene.add(thumbnail1);
}, undefined, function ( error ) {
	console.error( error );
});


// car
let car;
loader.load( Cart1_src, function ( gltf ) {
    
    const model = gltf.scene;
    
    model.position.set(-35, 2.7, 3.1);   
    
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5; 
    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;

    
    
    const clips = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    const action = mixer.clipAction(clip);
    
    action.play();
    mixers.push(mixer);
    
    scene.add(model);
    car = model;
}, undefined, function ( error ) {
	console.error( error );
});

// Import thumbnail2

let thumbnail2;
loader.load( thumbnail1_src, function ( gltf ) {
    
    const model = gltf.scene;
    
    model.position.set(5.3, 2.7, 3.1);
    thumbnail2 = model;
    scene.add(thumbnail2);
}, undefined, function ( error ) {
	console.error( error );
});

// car2
let car2;
loader.load( Cart2_src, function ( gltf ) {
    
    const model = gltf.scene; 

    model.position.set(5.3, 2.7, 3.1);

    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5;


    const mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    const action = mixer.clipAction(clip);
    
    action.play();
    mixers.push(mixer);

    scene.add(model);
    car2 = model;
}, undefined, function ( error ) {
	console.error( error );
});

// Import thumbnail3

let thumbnail3;
loader.load( thumbnail1_src, function ( gltf ) {
    
    const model = gltf.scene;
    
    model.position.set(45.6, 2.7, 3.1);
    thumbnail3 = model;
    scene.add(thumbnail3);
}, undefined, function ( error ) {
	console.error( error );
});

// car3
let car3;
loader.load( Cart3_src, function ( gltf ) {
    
    const model = gltf.scene; 

    model.position.set(45.6, 2.7, 3.1);

    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5;


    const mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    const action = mixer.clipAction(clip);
    
    action.play();
    mixers.push(mixer);

    scene.add(model);
    car3 = model;
}, undefined, function ( error ) {
	console.error( error );
});

// Import thumbnail4

let thumbnail4;
loader.load( thumbnail1_src, function ( gltf ) {
    
    const model = gltf.scene;
    
    model.position.set(85.9, 2.7, 3.1);  
    thumbnail4 = model;
    scene.add(thumbnail4);
}, undefined, function ( error ) {
	console.error( error );
});

// car4
let car4;
loader.load( Cart4_src, function ( gltf ) {
    
    const model = gltf.scene; 

    model.position.set(85.9, 2.7, 3.1);

    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5;


    const mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    const action = mixer.clipAction(clip);
    
    action.play();
    mixers.push(mixer);

    scene.add(model);
    car4 = model;
}, undefined, function ( error ) {
	console.error( error );
});

// Import thumbnail5
let thumbnail5;
loader.load( thumbnail1_src, function ( gltf ) {
    
    const model = gltf.scene;
    
    model.position.set(126.2, 2.7, 3.1);
    thumbnail5 = model;
    scene.add(thumbnail5);
}, undefined, function ( error ) {
	console.error( error );
});

let car5;
loader.load( Cart5_src, function ( gltf ) {
    
    const model = gltf.scene; 

    model.position.set(126.2, 2.7, 3.1);

    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5;


    const mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    const action = mixer.clipAction(clip);
    
    action.play();
    mixers.push(mixer);

    scene.add(model);
    car5 = model;
}, undefined, function ( error ) {
	console.error( error );
});


////////////// Environment Models /////////////////////////
// Tree1
loader.load( tree1_src, function ( gltf ) {
    const model = gltf.scene;
    model.children[0].castShadow = true;
    let bufferx = 2*bounds/tree_x_density;
        let bufferz = 2*bounds/tree_z_density;
        console.log("2 * " + bounds + " / " + tree_x_density +"=" + 2*bounds/tree_x_density);
        for(let pos_x = -bounds; pos_x <= bounds; pos_x += (2*bounds/tree_x_density)){
            for(let pos_z = -bounds; pos_z <= bounds; pos_z += (2*bounds/tree_z_density)){
                if(-50 < pos_z  && pos_z < 50) continue;
                let this_tree = model.clone();
                this_tree.position.set(pos_x + (getRandomInt(10*-bufferx,10*bufferx)/25), 0, pos_z + (getRandomInt(10*-bufferz,10*bufferz)/25));
                this_tree.rotateZ = getRandomInt(0,2*3.14159);
                let randomScale = 0.0;
                if(-200 < pos_z  && pos_z < 200){
                    randomScale = getRandomInt(5,10);
                }
                else if(-250 < pos_z  && pos_z < 250){
                    randomScale = getRandomInt(7,15);
                }
                else{
                    randomScale = getRandomInt(5,22);
                } 
                
                randomScale = randomScale / 15.0;
                if(getRandomInt(1,100) >= 95){
                    this_tree.scale.set(randomScale*1.5, randomScale*1.3, randomScale*1.5);
                }
                else this_tree.scale.set(randomScale, randomScale, randomScale);
                this_tree.parent = TreeGroup;
                TreeGroup.children.push(this_tree);
                
            }
        }
        scene.add(TreeGroup);
        TreeGroup.position.x += panSpeed;
        first_random = true;
    
}, undefined, function ( error ) {
	console.error( error );
});

//// Tree2
//loader.load( tree2_src, function ( gltf ) {
//    const model = gltf.scene;
//    model.position.set(50, 0, -50);
//    model.children[0].castShadow = true;
//    treeModels.push(model.children[0]);
//    
//}, undefined, function ( error ) {
//	console.error( error );
//});
//
//// Tree3
//loader.load( tree3_src, function ( gltf ) {
//    const model = gltf.scene;
//    model.position.set(75, 0, -60);
//    model.children[0].castShadow = true;
//    treeModels.push(model.children[0]);
//    
//}, undefined, function ( error ) {
//	console.error( error );
//});
//// Tree4
//loader.load( tree4_src, function ( gltf ) {
//    const model = gltf.scene;
//    model.position.set(30, 1, -60);
//    model.children[0].castShadow = true;
//    treeModels.push(model.children[0]);
//    
//}, undefined, function ( error ) {
//	console.error( error );
//});
//// Tree5
//loader.load( tree5_src, function ( gltf ) {
//    const model = gltf.scene;
//    model.position.set(-20, 0, -55);
//    model.children[0].castShadow = true;
//    treeModels.push(model.children[0]);
//    
//}, undefined, function ( error ) {
//	console.error( error );
//});




// Train Engine
//const trainGeometry = new THREE.BoxGeometry(30, 10, 12);
//const trainMaterial = new THREE.MeshStandardMaterial({
//    color: 0x111111,
//    visible: true
//});
//const train = new THREE.Mesh(trainGeometry, trainMaterial);
//scene.add(train);
//train.position.set(32, 8.5, 0);
//train.castShadow = true;

// Train Car / Box
// const carGeometry = new THREE.BoxGeometry(30, 10, 12);
// const carMaterial = new THREE.MeshStandardMaterial({
 //   color: 0xe50505,
//    visible: true
// });
// const car = new THREE.Mesh(carGeometry, carMaterial);
// scene.add(car);
// car.position.set(0, 8.5, 0);
// car.castShadow = true;

// Train Car2 / Box 
// const car2Geometry = new THREE.BoxGeometry(30, 10, 12);
// const car2Material = new THREE.MeshStandardMaterial({
//     color: 0x193569,
//     visible: true
// });
// const car2 = new THREE.Mesh(car2Geometry, car2Material);
// scene.add(car2);
// car2.position.set(-35, 8.5, 0);
// car2.castShadow = true;

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
scene.add(directionalLight);
directionalLight.position.set(-400, 400, 400);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -350;
directionalLight.shadow.camera.top = 500;
directionalLight.shadow.camera.left = -700;
directionalLight.shadow.camera.right = 750;
directionalLight.shadow.camera.far = 1500;

directionalLight.shadow.bias = -0.0007;
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

scene.fog = new THREE.FogExp2(0x99dcf4, 0.0013);

// BG
renderer.setClearColor(0x8bb7ed);

// GUI
const gui = new dat.GUI();

var options = {
    // car1Color: '#e50505',
    // visible: true,
    speed: .5,
    dist: 3,
    //car2Color: '#193569',
    //visible: true
};
gui.add(options, 'speed' , -.5, 2, .05).name("Speed").onChange(function(e) {
    panSpeed = e;
}); 
var changeCameraButton = {
    onClick: function() {
        switchCamera();
    }
};
gui.add(changeCameraButton, 'onClick').name('Change Camera');


let TreeGroup = new THREE.Group;

function TreeController(){
    TreeGroup.position.x += panSpeed;
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
let objPtr = 0;

const textposition1 = new THREE.Vector3();
const followText1 = document.getElementById('follow-text-one');
const textposition2 = new THREE.Vector3();
const followText2 = document.getElementById('follow-text-two');
const textposition3 = new THREE.Vector3();
const followText3 = document.getElementById('follow-text-three');
const textposition4 = new THREE.Vector3();
const followText4 = document.getElementById('follow-text-four');
const textposition5 = new THREE.Vector3();
const followText5 = document.getElementById('follow-text-five');

const followTextArray = [followText1, followText2, followText3, followText4, followText5];
//hideText(followTextArray[1], followTextArray[2]);

let canvas = document.querySelector('.webgl');

document.body.onclick = function(e) {
    if( RESOURCES_LOADED == false || currCam == camera) return;
    if(objPtr != 0){
        console.log("hi");
        if(isOn(followTextArray[objPtr-1])) hideText(followTextArray[objPtr-1]);
        else showText(followTextArray[objPtr-1]);
        if(Thumbnails[objPtr-1].visible) Thumbnails[objPtr-1].visible = false;
        else Thumbnails[objPtr-1].visible = true;
    }
}

document.body.onkeydown = function(e) {
    if( RESOURCES_LOADED == false) return;
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ){
        switchCamera();
    }
    if(currCam == camera2) {
        // left arrow key
        if (e.keyCode == 37) {
            if(objPtr > 0) {
                objPtr--;
                camera2.position.x = objArray[objPtr].position.x;
            }
            for (let i = 1; i < followTextArray.length + 1; i++){
                if (i == objPtr){
                    //showText(followTextArray[i-1]);
                }
                else{
                    Thumbnails[i-1].visible = true;
                    hideText(followTextArray[i-1]);
                }
            }
        }
        // right arrow key
        if (e.keyCode == 39) {
            if(objPtr < objArray.length-1) {
                objPtr++;
                camera2.position.x = objArray[objPtr].position.x;
            }
            for (let i = 1; i < followTextArray.length + 1; i++){
                if (i == objPtr){
                    //showText(followTextArray[i-1]);
                }
                else{
                    hideText(followTextArray[i-1]);
                }
            }
        }
    }
}



function switchCamera() {
    orbit.autoRotate = !orbit.autoRotate;
    var newCam = currCam === camera ? camera2 : camera;
    currCam = newCam;
    if(orbit.autoRotate == true) {
        console.log("turnedoff close cam")
        for(let i = 0; i < followTextArray.length; i++){
            hideText(followTextArray[i]);
        }
        for(let i = 0; i < followTextArray.length; i++){
            Thumbnails[i].visible = true;
        }
    }
    // if(orbit.autoRotate == false) {
    //     showText(followTextArray[objPtr-1]); 
    // } 
}

///////////////// ANIMATE HERE /////////////////////
const clock = new THREE.Clock();
function animate(time) {
    if( RESOURCES_LOADED == false){
        requestAnimationFrame(animate);

        loadingScreen.box.position.x -= 0.05;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x)
        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }
    orbit.update();

    // giving position-limit to the free-view camera
    const cameraY = camera.position.y;
    // <= 20 degree
    if (cameraY <= Math.PI / 9){
        camera.position.y = Math.PI / 9;
    }
    addFollowText(textposition1, followText1, car, camera2, canvas);
    addFollowText(textposition2, followText2, car2, camera2, canvas);
    addFollowText(textposition3, followText3, car3, camera2, canvas);
    addFollowText(textposition4, followText4, car4, camera2, canvas);
    addFollowText(textposition5, followText5, car5, camera2, canvas);
    
    const delta = clock.getDelta();
    
	for ( const mixer of mixers ) {
        mixer.update( delta );
        mixer.timeScale = 10*panSpeed;
    }
    
    TreeController(); 
    
       
    if(trainTracks != null) {
        trainTracks.position.x += panSpeed;
        thisTrack = trainTracks.children[trainTracks.children.length-1];
        if(thisTrack.position.x + trainTracks.position.x > bounds){
         thisTrack.position.x = -(2*bounds)+thisTrack.position.x+40;
         trainTracks.children.pop();
         trainTracks.children.unshift(thisTrack);
        }
        if(thisTrack.position.x + trainTracks.position.x < -bounds){
            thisTrack.position.x = (2*bounds)+thisTrack.position.x;
            trainTracks.children.pop();
            trainTracks.children.unshift(thisTrack);
           }
    }
    if(TreeGroup != null) {
        TreeGroup.position.x += panSpeed;
        thisTrack = TreeGroup.children[TreeGroup.children.length-1];
        if(thisTrack.position.x + TreeGroup.position.x > bounds){
         thisTrack.position.x = -(2*bounds)+thisTrack.position.x+40;
         TreeGroup.children.pop();
         TreeGroup.children.unshift(thisTrack);
         
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



canvas = document.querySelector('canvas');


// Allows the window to resize/scale as needed//

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera2.position.z = 20 + 0.0135*(window.innerHeight - 1080);
    
});

/*
window.addEventListener('mousedown', function() {
    gsap.to(cameraT.position,{
        x: camera2.position.x,
        y: camera2.position.y,
        z: camera2.position.z
        duration: 2.0
    })
})
*/
