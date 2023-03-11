import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

let scene1, scene2, camera1, camera2, renderer1, renderer2;

/*scene1 = new THREE.Scene();

renderer1 = new THREE.WebGLRenderer();
renderer1.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer1.domElement);

camera1 = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
);
const controls1 = new OrbitControls( camera1, renderer1.domElement );
camera1.position.set( 0,2, 1 );*/

scene2 = new THREE.Scene();

renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer2.domElement);

camera2 = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
);
const controls2 = new OrbitControls( camera2, renderer2.domElement );
camera2.position.set( 500, 350, 750 );
//controls1.update();
controls2.update();
//add xyz axis
const axesHelper = new THREE.AxesHelper(5);
//scene1.add(axesHelper);
//add a box 
const boxGeometry = new THREE.BoxGeometry(2, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//scene1.add(box);
//scene2.add(box);


const iframe = document.createElement('iframe');
iframe.src="https://threejs.org/";
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.style.border = 'none';

const element = new CSS3DObject(iframe);
element.position.set(0, 0, 0);
element.rotation.set(0, 0, 0);
//scene1.add(element);
scene2.add(element);
//boxMaterial.map = new THREE.Texture(element.domElement);

// render the scene and the CSS2D elements
function animate(time) {
    //controls1.update();
    controls2.update();
    requestAnimationFrame( animate );
	//renderer1.render( scene1, camera1 );
    renderer2.render( scene2, camera2 );

}
//renderer.setAnimationLoop(animate);
animate();

