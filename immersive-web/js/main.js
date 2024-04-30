//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, titleTexture, titleMesh, bedWallTexture, family1Texture, family2Texture, family3Texture, family4Texture, family5Texture, family6Texture, family7Texture, family8Texture, pcWallTexture, doorWallTexture, floorTexture, ceilingTexture, closetWallTexture;
let sceneContainer = document.querySelector("#scene-container");

function init() {
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

    //adding title geometry
    const titleTextureLoader = new THREE.TextureLoader();
    titleTexture = titleTextureLoader.load('./assets/looking-@t-home.png');
    const titleMaterial = new THREE.MeshBasicMaterial({ map: titleTexture, transparent: true });
    const titleGeometry = new THREE.BoxGeometry(0, 1, 1);
    titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.position.set(2, 0, 0);
    scene.add(titleMesh);

    //adding bed wall
    const bedWallTextureLoader = new THREE.TextureLoader();
    bedWallTexture = bedWallTextureLoader.load('./assets/bed-wall.png');
    const bedWallMaterial = new THREE.MeshBasicMaterial({ map: bedWallTexture, transparent: true });
    const bedWallGeometry = new THREE.BoxGeometry(11.62, 7, 0);
    const bedWallMesh = new THREE.Mesh(bedWallGeometry, bedWallMaterial);
    bedWallMesh.position.set(1.75, 0, -3.3);
    scene.add(bedWallMesh);

    //adding family pictures behind window
    const familyTextureLoader = new THREE.TextureLoader();
    family1Texture = familyTextureLoader.load('./assets/family-1.png');
    family2Texture = familyTextureLoader.load('./assets/family-2.png');
    family3Texture = familyTextureLoader.load('./assets/family-3.png');
    family4Texture = familyTextureLoader.load('./assets/family-4.png');
    family5Texture = familyTextureLoader.load('./assets/family-5.png');
    family6Texture = familyTextureLoader.load('./assets/family-6.png');
    family7Texture = familyTextureLoader.load('./assets/family-7.png');
    family8Texture = familyTextureLoader.load('./assets/family-8.png');
    const familyMaterial = new THREE.MeshBasicMaterial({ map: family1Texture });
    const familyGeometry = new THREE.BoxGeometry(4.54, 2, 0);
    const familyMesh = new THREE.Mesh(familyGeometry, familyMaterial);
    familyMesh.position.set(0.35, 0.93, -3.4);
    scene.add(familyMesh);

    // Array of textures
    const textures = [
        family1Texture,
        family2Texture,
        family3Texture,
        family4Texture,
        family5Texture,
        family6Texture,
        family7Texture,
        family8Texture,
    ];

    let currentTextureIndex = 0;

    // Function to change texture after 2 seconds
    function changeTexture() {
        currentTextureIndex = (currentTextureIndex + 1) % textures.length;
        familyMesh.material.map = textures[currentTextureIndex];
    }

    // Change texture after 2 seconds and repeat every 2 seconds
    setInterval(changeTexture, 2000);

    //adding pc wall
    const pcWallTextureLoader = new THREE.TextureLoader();
    pcWallTexture = pcWallTextureLoader.load('./assets/pc-wall.png');
    const pcWallMaterial = new THREE.MeshBasicMaterial({ map: pcWallTexture, transparent: true });
    const pcWallGeometry = new THREE.BoxGeometry(11.62, 7, 0); //width, heiight, depth
    const pcWallMesh = new THREE.Mesh(pcWallGeometry, pcWallMaterial);
    pcWallMesh.position.set(1.75, 0, 3.3);
    scene.add(pcWallMesh);

    //adding door wall
    const doorWallTextureLoader = new THREE.TextureLoader();
    doorWallTexture = doorWallTextureLoader.load('./assets/door-wall.png');
    const doorWallMaterial = new THREE.MeshBasicMaterial({ map: doorWallTexture, transparent: true });
    const doorWallGeometry = new THREE.BoxGeometry(0, 7, 7);
    const doorWallMesh = new THREE.Mesh(doorWallGeometry, doorWallMaterial);
    doorWallMesh.position.set(-4, 0, 0);
    scene.add(doorWallMesh);

    //adding closet wall
    const closetWallTextureLoader = new THREE.TextureLoader();
    closetWallTexture = closetWallTextureLoader.load('./assets/closet-wall.png');
    const closetWallMaterial = new THREE.MeshBasicMaterial({ map: closetWallTexture, transparent: true });
    const closetWallGeometry = new THREE.BoxGeometry(0, 7, 7);
    const closetWallMesh = new THREE.Mesh(closetWallGeometry, closetWallMaterial);
    closetWallMesh.position.set(7.5, 0, 0);
    scene.add(closetWallMesh);

    //adding floor 
    const floorTextureLoader = new THREE.TextureLoader();
    floorTexture = floorTextureLoader.load('./assets/floor-rug.png');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, transparent: true });
    const floorGeometry = new THREE.BoxGeometry(14.2, 0, 7.2);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.position.set(2.2, -3.6, 0); // x, y, z
    scene.add(floorMesh);

    //adding ceiling
    const ceilingTextureLoader = new THREE.TextureLoader();
    ceilingTexture = ceilingTextureLoader.load('./assets/ceiling.png');
    const ceilingMaterial = new THREE.MeshBasicMaterial({ map: ceilingTexture, transparent: true });
    const ceilingGeometry = new THREE.BoxGeometry(14.2, 0, 7.2);
    const ceilingMesh = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceilingMesh.position.set(2.2, 3.4, 0); // x, y, z
    scene.add(ceilingMesh);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 2;
    camera.position.x = 2;

}

function animate() {
    titleMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

} //resume video at 14:17

window.addEventListener('resize', onWindowResize, false);
init();
animate();