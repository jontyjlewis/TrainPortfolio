import * as THREE from 'three';

function setupKeyControls() {
    var cube = scene.getObjectByName('cube');
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37:
        cube.rotation.x += 0.1;
        break;
        case 38:
        cube.rotation.z -= 0.1;
        break;
        case 39:
        cube.rotation.x -= 0.1;
        break;
        case 40:
        cube.rotation.z += 0.1;
        break;
      }
    };
  }