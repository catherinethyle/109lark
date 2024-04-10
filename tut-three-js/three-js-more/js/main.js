//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, octahedron, cinna;
let sceneContainer = document.querySelector("#scene-container");

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x79C5F3);

    const lightRight = new THREE.DirectionalLight(0xFDEDDB, 3); 
    lightRight.position.set(4, 2, 5);
    scene.add(lightRight);

    const helper = new THREE.DirectionalLightHelper( lightRight, 5);
    scene.add(helper);

    const lightLeft = new THREE.DirectionalLight(0xFFB0E7, 3);
    lightLeft.position.set(-4, 1, 3);
    scene.add(lightLeft);

    camera = new THREE.PerspectiveCamera(
        75, //set field of view
        sceneContainer.clientWidth / sceneContainer.clientHeight, //set aspect ratio
        0.1,  //set camera for near plane
        1000 //set camera for far plane
    );

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new GLTFLoader(); //to load 3d models
    loader.load('3d/sanrio-cinna/scene.gltf', function(gltf){
        cinna = gltf.scene;
        scene.add(cinna);
        cinna.position.y = -2;
        cinna.scale.set(0.75, 0.75, 0.75);
    })

    const geometry = new THREE.OctahedronGeometry( 1, 0);

    // const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const texture = new THREE.TextureLoader().load('textures/texture-1.jpg');

    const material = new THREE.MeshStandardMaterial({map: texture});

    octahedron = new THREE.Mesh(geometry, material);
    
    scene.add(octahedron);

    camera.position.z = 5;
}

function animate(){
    requestAnimationFrame(animate);

    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.01;

    octahedron.position.x = Math.sin(Date.now() / 3000) * 1;
    octahedron.position.y = Math.sin(Date.now() / 1000) * 2;
    octahedron.position.z = Math.sin(Date.now() / 2000) * 3;

    if (cinna){
        cinna.rotation.y = Math.sin(Date.now() / 1000);
    }
    
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