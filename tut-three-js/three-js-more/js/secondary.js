//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, dog, mixer;
let sceneContainer = document.querySelector("#scene-container-2");

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xC3C9FF);

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

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    //load dog model
    const loader = new GLTFLoader();
    loader.load('./3d/dog-shiny.gltf', function(gltf) {
        dog = gltf.scene;
        scene.add(dog);
        dog.scale.set(3, 3, 3);
        dog.position.y = -1.5;

        //animation
        mixer = new THREE.AnimationMixer(dog); //initiate mixer
        const clips = gltf.animations; //load all clips

        //load play animations
        const clipPant = THREE.AnimateClip.findByName(clips, 'pant');
        const actionPant = mixer.clipAction(clipPant);
        actionPant.play();

        const clipTail = THREE.AnimateClip.findByName(clips, 'tail');
        const actionTail = mixer.clipAction(clipTail);
        actionTail.play();
    });

    camera.position.z = 5;
}

const clock = new THREE.Clock();

function animate(){
    requestAnimationFrame(animate);

    mixer.update(clock.getDelta());
    
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