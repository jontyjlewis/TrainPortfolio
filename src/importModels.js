import $ from 'jquery';
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const carts = [], carts_ipos = [];

const mixers = [];
let panSpeed = .5;
let moveSpeed = 1;
let first_random = 0;
let tree_x_density = 100;
let tree_z_density = 100;

// models imports
let trainHead_src, trainTracks_src, tree1_src, tree2_src, tree3_src, tree4_src, tree5_src;
trainHead_src = require('../assets/TrainHeadUnlit.glb');
trainTracks_src = require('../assets/TrainTracks.glb');
Cart1_src = require('../assets/Cart1.glb');
Cart2_src = require('../assets/Cart2.glb');
tree1_src = require('../assets/Tree1.glb');
tree2_src = require('../assets/Tree2.glb');
tree3_src = require('../assets/Tree3.glb');
tree4_src = require('../assets/Tree4.glb');
tree5_src = require('../assets/Tree5.glb');

// Scene Setup

// Train Front
const loader = new GLTFLoader();
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

// car2
let testAction;
let car2;
loader.load( Cart2_src, function ( gltf ) {
    const model = gltf.scene;
    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5;
    model.position.set(-35, 2.1, 2.85);    
    let mixer2 = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    console.log(clip);
    const action = mixer2.clipAction(clip);
    testAction = action;
    testAction.play();
    model.children[0].children[0].castShadow = true;
    scene.add(model);
    mixers.push(mixer2);
    car2 = model;
}, undefined, function ( error ) {
	console.error( error );
});

// car
let car;
loader.load( Cart1_src, function ( gltf ) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(5.3, 2.1, 2.85);
    model.children[0].children[0].material.roughness = 0.6;
    model.children[0].children[0].material.metalness = 0.5;
    model.children[0].children[0].castShadow = true;
    model.children[0].children[0].receiveShadow = true;
    const clips = gltf.animations;
    let mixer = new THREE.AnimationMixer(model);
    console.log(gltf.animations)
    const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
    const action = mixer.clipAction(clip);
    action.play();
    mixers.push(mixer);
    car = model;
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

