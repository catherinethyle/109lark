// import THREE.js
import * as THREE from 'three';

// import add ons
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// declare different variables
let camera, scene, renderer, startTime, object, stats;

init();
animate();

// initialize variables and their characteristics
function init() {
    // ***** Camera: *****
    camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.25, 16); // (field of view, aspect ratio, near clipping plane, far clipping plane)

    // set camera position (x, y, z) position
    camera.position.set(0, 1.3, 3);

    // create new scene for THREE.js model
    scene = new THREE.Scene();

    // ****** Lights: *******
    // add ambient light 
    scene.add(new THREE.AmbientLight(0xcccccc)); // gray

    // add spot light 
    const spotLight = new THREE.SpotLight(0xffffff, 60); //(white, intensity)
    spotLight.angle = Math.PI / 5;  //set angel of light (PI/5) ~36 degrees
    spotLight.penumbra = 0.2; //softness and hardness of shadows
    spotLight.position.set(2, 3, 3); //(x, y, z) position
    spotLight.castShadow = true; //shadow true or false
    spotLight.shadow.camera.near = 3; //near plane distance, has to be >0
    spotLight.shadow.camera.far = 10; //far plane distance, objects beyond this distance do not casst shadows
    spotLight.shadow.mapSize.width = 1024; // shadow map width
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight); //shadow map height

    // directional light 
    const dirLight = new THREE.DirectionalLight(0x55505a, 3); //(dark gray, intensity)
    dirLight.position.set(0, 3, 0); //set (x, y, z) position
    dirLight.castShadow = true; // shadow true or false
    dirLight.shadow.camera.near = 1; // near plane distance
    dirLight.shadow.camera.far = 10; //far plane distance

    dirLight.shadow.camera.right = 1; // right boundry of shadow from camera
    dirLight.shadow.camera.left = - 1; // left boundry of shadow from camera
    dirLight.shadow.camera.top = 1; // top boundry of shadow from camera
    dirLight.shadow.camera.bottom = - 1; //bottom boundry of shadow from camera

    dirLight.shadow.mapSize.width = 1024; // shadow map width
    dirLight.shadow.mapSize.height = 1024; // shadow map hieght
    scene.add(dirLight);

    // ***** Clipping planes: *****

    // local plane parallel to x-z plane (horizontal)
    const localPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0.8); // (x, y, z) position, distance of plane from orgin (0, 0, 0)
    //global plane parallel to y=z plane (veritcal)
    const globalPlane = new THREE.Plane(new THREE.Vector3(- 1, 0, 0), 0.1); //(x, y, z) position, distance of plane from orgin 

    // Geometry
    // mesh phong material
    const material = new THREE.MeshPhongMaterial({
        color: 0x80ee10, //bright green
        shininess: 100, //shininess value 0 -> 1000
        side: THREE.DoubleSide, //render on both sides

        // ***** Clipping setup (material): *****
        clippingPlanes: [localPlane], //[clipping plane used for this material]
        clipShadows: true, //shadows will be clipped by plane defined above

        alphaToCoverage: true, //alpha coverage enabed

    });

    // creating torus knot geometry
    const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20); // (radius, tube radius, radius segments, tubular segments)

    // outlineing geometry material
    object = new THREE.Mesh(geometry, material);
    object.castShadow = true; // allow to casst shadows
    scene.add(object); //add geometry to scene

    // create ground plane
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 9, 1, 1), // (width, height, width segments, height segments)
        new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 }) // (gray color, shininess level 0 - 1000)
    );

    ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    ground.receiveShadow = true; // ground has shadow
    scene.add(ground); // add ground plane to scene

    // Stats

    stats = new Stats();
    document.body.appendChild(stats.dom);

    // Renderer

    renderer = new THREE.WebGLRenderer({ antialias: true }); // smooths edges and improves visual quality of scene
    renderer.shadowMap.enabled = true; // shadow rendering true
    renderer.setPixelRatio(window.devicePixelRatio); // match device pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight); // render output match device pixel ratio
    window.addEventListener('resize', onWindowResize); // resize canvas to match resize window
    document.body.appendChild(renderer.domElement); // render output canvas to html document body

    // ***** Clipping setup (renderer): *****
    const globalPlanes = [globalPlane],
        Empty = Object.freeze([]);
    renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
    renderer.localClippingEnabled = true;

    // Controls
    // new isntance of orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0); // sets center coordinates of scene
    controls.update(); // shows modification to controls

    // Start
    // set timestamps
    startTime = Date.now();

}

function onWindowResize() {

    // camera aspect ratio match inner width and hieght od window
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // render size match window aspect ratio
    renderer.setSize(window.innerWidth, window.innerHeight);

}

// animate scene
function animate() {

    // show current time
    const currentTime = Date.now();
    const time = (currentTime - startTime) / 1000; // calculates elapsed time in seconds

    // call animate fuction frame by frame
    requestAnimationFrame(animate);

    object.position.y = 0.8; // y position
    object.rotation.x = time * 0.5; // x rotation speed
    object.rotation.y = time * 0.2; // y rotation speed
    object.scale.setScalar(Math.cos(time) * 0.125 + 0.875); // sclae of object

    stats.begin(); // show stats
    renderer.render(scene, camera); // render scene
    stats.end();

}

