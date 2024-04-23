//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, bedTexture, shelfTexture, floorTexture;
let sceneContainer = document.querySelector("#scene-container");

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x79C5F3);

    const lightRight = new THREE.DirectionalLight(0xFDEDDB, 3); 
    lightRight.position.set(4, 2, 5);
    scene.add(lightRight);

    const lightLeft = new THREE.DirectionalLight(0xFFB0E7, 3);
    lightLeft.position.set(-4, 1, 3);
    scene.add(lightLeft);

    camera = new THREE.PerspectiveCamera(
        75, //set field of view
        sceneContainer.clientWidth / sceneContainer.clientHeight, //set aspect ratio
        0.1,  //set camera for near plane
        1000 //set camera for far plane
    );

    const bedTextureLoader = new THREE.TextureLoader();
    bedTexture = bedTextureLoader.load('./assets/bed.png');

    const bedMaterial = new THREE.MeshBasicMaterial({ map: bedTexture, transparent: true});

    const bedGeometry = new THREE.BoxGeometry(7, 7, 0);
    const bedMesh = new THREE.Mesh(bedGeometry, bedMaterial);
    bedMesh.position.set(0, 0, -3);
    scene.add(bedMesh);

    const shelfTextureLoader = new THREE.TextureLoader();
    shelfTexture = shelfTextureLoader.load('./assets/shelf.png');

    const shelfMaterial = new THREE.MeshBasicMaterial({ map: shelfTexture, transparent: true});

    const shelfGeometry = new THREE.BoxGeometry(7, 7, 0); //width, heiight, depth
    const shelfMesh = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelfMesh.position.set(3, 0, 3);
    scene.add(shelfMesh);

    const floorTextureLoader = new THREE.TextureLoader();
    floorTexture = floorTextureLoader.load('./assets/rug.png');

    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, transparent: true});

    const floorGeometry = new THREE.BoxGeometry(7, 0, 7);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.position.set(0, -3, 0); // x, y, z
    scene.add(floorMesh);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // const controls = new THREE.FirstPersonControls(camera, renderer.domElement);

    // // set the initial position and direction on the controls
    // controls.lookSpeed = 0.1;
    // controls.movementSpeed = 10;
    // controls.noFly = true;
    // controls.lookVertical = true;

    camera.position.z = 5;

}

function animate(){
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

} //resume video at 14:17

window.addEventListener('resize', onWindowResize, false);
init();
animate();