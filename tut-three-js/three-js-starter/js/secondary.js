//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

// declare variables
let scene, camera, renderer, octahedron, capsule;

// initialize variables and their characteristics
function init(){
    // create the base scene for your THREE.js model
    scene = new THREE.Scene();

    // directional light 
    const lightRight = new THREE.DirectionalLight(0xffffff, 3); //(hex code color, intensity of light)
    lightRight.position.set(1, 1, 5); // set (x, y, z) position
    scene.add(lightRight);

    // to visualize where your light is hitting
    const helper = new THREE.DirectionalLightHelper( lightRight, 5 ); // (name of directional light, scale of helper)
    scene.add( helper );

    // secondary directional light
    const lightLeft = new THREE.DirectionalLight(0xfff0f0, 3);
    lightLeft.position.set(-1, 1, 5);
    scene.add(lightLeft);

    // camera to view the scene
    camera = new THREE.PerspectiveCamera(
        75, //set field of view
        window.innerWidth / window.innerHeight, //set aspect ratio
        0.1,  //set camera for near plane
        1000 //set camera for far plane
    );

    
    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new GLTFLoader(); //to load 3d models

    loader.load('3d/sanrio-cinna/scene.gltf', function(gltf){
        const cinna = gltf.scene;
        scene.add(cinna);
    })

    const geometry = new THREE.OctahedronGeometry( 2, 0);

    const geometryTwo = new THREE.CapsuleGeometry(1, 2, 4, 8);

    // const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const texture = new THREE.TextureLoader().load('textures/texture-1.jpg');

    const textureTwo = new THREE.TextureLoader().load('textures/texture-2.jpg');

    const material = new THREE.MeshStandardMaterial({map: texture});

    const materialTwo = new THREE.MeshStandardMaterial({map: textureTwo});

    octahedron = new THREE.Mesh(geometry, material);
    
    capsule = new THREE.Mesh(geometryTwo, materialTwo);
    
    scene.add(octahedron);
    scene.add(capsule);

    camera.position.z = 5;
}

function animate(){
    requestAnimationFrame(animate);

    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.01;

    capsule.rotation.x -= 0.01;
    capsule.rotation.y -= 0.01;
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

} //resume video at 14:17

window.addEventListener('resize', onWindowResize, false);
init();
animate();