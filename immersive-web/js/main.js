//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, bedTexture, shelfTexture, titleTexture, titleMesh, doorTexture, floorTexture, closetTexture;
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
        70, //set field of view
        sceneContainer.clientWidth / sceneContainer.clientHeight, //set aspect ratio
        0.01,  //set camera for near plane
        2000 //set camera for far plane
    );

    const titleTextureLoader = new THREE.TextureLoader();
    titleTexture = titleTextureLoader.load('./assets/looking-@t-home.png');
    const titleMaterial = new THREE.MeshBasicMaterial({ map: titleTexture, transparent: true});
    const titleGeometry = new THREE.BoxGeometry(0, 1, 1);
    titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.position.set(3, 0, 0);
    scene.add(titleMesh);

    const bedTextureLoader = new THREE.TextureLoader();
    bedTexture = bedTextureLoader.load('./assets/bed-wall.png');
    const bedMaterial = new THREE.MeshBasicMaterial({ map: bedTexture, transparent: true});
    const bedGeometry = new THREE.BoxGeometry(11.62, 7, 0);
    const bedMesh = new THREE.Mesh(bedGeometry, bedMaterial);
    bedMesh.position.set(1.75, 0, -3.3);
    scene.add(bedMesh);

    // const drawerTextureLoader = new THREE.TextureLoader();
    // drawerTexture = drawerTextureLoader.load('./assets/drawer.PNG');
    // const drawerMaterial = new THREE.MeshBasicMaterial({ map: drawerTexture, transparent: true});
    // const drawerGeometry = new THREE.BoxGeometry(7, 7, 0);
    // const drawerMesh = new THREE.Mesh(drawerGeometry, drawerMaterial);
    // drawerMesh.position.set(6.5, 0, -4);
    // scene.add(drawerMesh);

    const shelfTextureLoader = new THREE.TextureLoader();
    shelfTexture = shelfTextureLoader.load('./assets/pc-wall.png');
    const shelfMaterial = new THREE.MeshBasicMaterial({ map: shelfTexture, transparent: true});
    const shelfGeometry = new THREE.BoxGeometry(11.62, 7, 0); //width, heiight, depth
    const shelfMesh = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelfMesh.position.set(1.75, 0, 3.3);
    scene.add(shelfMesh);

    const doorTextureLoader = new THREE.TextureLoader();
    doorTexture = doorTextureLoader.load('./assets/door-wall.png');
    const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture, transparent: true});
    const doorGeometry = new THREE.BoxGeometry(0, 7, 7);
    const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
    doorMesh.position.set(-4, 0, 0);
    scene.add(doorMesh);

    const closetTextureLoader = new THREE.TextureLoader();
    closetTexture = closetTextureLoader.load('./assets/closet-wall.png');
    const closetMaterial = new THREE.MeshBasicMaterial({ map: closetTexture, transparent: true});
    const closetGeometry = new THREE.BoxGeometry(0, 7, 7);
    const closetMesh = new THREE.Mesh(closetGeometry, closetMaterial);
    closetMesh.position.set(7.5, 0, 0);
    scene.add(closetMesh);

    // const rugTextureLoader = new THREE.TextureLoader();
    // rugTexture = rugTextureLoader.load('./assets/rug.png');
    // const rugMaterial = new THREE.MeshBasicMaterial({ map: rugTexture, transparent: true});
    // const rugGeometry = new THREE.BoxGeometry(7, 0, 7);
    // const rugMesh = new THREE.Mesh(rugGeometry, rugMaterial);
    // rugMesh.position.set(0, -3.5, 0); // x, y, z
    // scene.add(rugMesh);

    const floorTextureLoader = new THREE.TextureLoader();
    floorTexture = floorTextureLoader.load('./assets/floor-rug.png');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, transparent: true});
    const floorGeometry = new THREE.BoxGeometry(14.2, 0, 7.2);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.position.set(2.2, -3.6, 0); // x, y, z
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

    camera.position.z = 2;
    camera.position.x = 2;

}

function animate(){
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);

    titleMesh.rotation.y += 0.01;
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

} //resume video at 14:17

window.addEventListener('resize', onWindowResize, false);
init();
animate();