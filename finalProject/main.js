import * as THREE from "three";
import animatedStar from "./components/animatedStars.js";
import { addStars } from "./components/addStars.js";
import { OrbitControls } from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "https://unpkg.com/three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "https://unpkg.com/three/examples/jsm/geometries/TextGeometry.js";
import { EffectComposer } from "https://unpkg.com/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://unpkg.com/three/examples/jsm/postprocessing/UnrealBloomPass.js";

let spaceship, spaceship2, earth, atmosphere, blackhole;
let starShipMixer,
  starShipMixer2,
  starShipAction,
  starShipAction2,
  blackHoleMixer,
  blackHoleAction;
let greetingText, iconText;
let starSpeed = 4500,
  cameraMovement,
  factor;
const globePosition = new THREE.Vector3(100, 0, 0);
const sun_lightPosition = new THREE.Vector3(100, 0, 800);

//init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
// camera
camera.position.set(0, 0, 3400);
const controls = new OrbitControls(camera, renderer.domElement);
addStars(scene);

// light
const PointLight_sun = new THREE.PointLight(0xffffff, 0.25);
PointLight_sun.position.copy(sun_lightPosition);
scene.add(PointLight_sun);

const PointLight_bh = new THREE.PointLight(0xffffff, 0.3, 1000);
PointLight_bh.position.set(-500, 0, -1800);
scene.add(PointLight_bh);

// loading manager to handle loading page
const loadingManager = new THREE.LoadingManager();
const progressContainer = document.querySelector(".progress-container");
loadingManager.onLoad = function () {
  progressContainer.style.display = "none";
};

// Greeting text
const fontLoader = new FontLoader(loadingManager);
fontLoader.load("./public/fonts/retro_font.json", (font) => {
  const textGeometry = new TextGeometry("Hello!", {
    font: font,
    size: 150,
    height: 2,
  });

  const textMaterial = new THREE.MeshNormalMaterial();

  greetingText = new THREE.Mesh(textGeometry, textMaterial);
  // textGeometry.computeBoundingSphere();
  greetingText.position.set(-444, 75, 3000); // Calculated bycomputeBoundingSphere
  scene.add(greetingText);
});

// icon
fontLoader.load("./public/fonts/social_icon.json", (font) => {
  const textGeometry = new TextGeometry("clms", {
    font: font,
    size: 150,
    height: 2,
  });

  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x2c3e50,
  });

  iconText = new THREE.Mesh(textGeometry, textMaterial);
  iconText.position.set(-444, -175, 3000); // Computed by computeBoundingSphere
  scene.add(iconText);
  // textGeometry.computeBoundingSphere();
  // let center = textGeometry.boundingSphere.center;
  // console.log(center);
});

// Earth texture
const earthTexture = new THREE.TextureLoader(loadingManager).load(
  "./public/earth.jpg"
);
const normalTexture = new THREE.TextureLoader(loadingManager).load(
  "./public/earth-normalmap.jpg"
);

// Earth material
const earthMaterial = new THREE.MeshPhongMaterial({
  map: earthTexture,
  normalMap: normalTexture,
});
earth = new THREE.Mesh(new THREE.SphereGeometry(40, 32, 32), earthMaterial);
earth.position.copy(globePosition);
scene.add(earth);

// Atomsphere
const atmosphereMaterial = new THREE.MeshStandardMaterial({
  emissive: 0x87ceeb, // glowing
  emissiveIntensity: 0.05,
  color: 0x87ceeb,
  transparent: true,
  opacity: 0.2,
});
atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(41, 32, 32),
  atmosphereMaterial
);
atmosphere.position.copy(globePosition);
scene.add(atmosphere);

// https://sketchfab.com/3d-models/luminaris-starship-night-view-85c07f1546ec4574b5183597f35b2a88
const starshipLoader = new GLTFLoader(loadingManager);
starshipLoader.load("./public/starship/scene.gltf", (loader) => {
  spaceship = loader.scene;
  scene.add(spaceship);
  spaceship.scale.set(2, 2, 2);
  spaceship.position.set(300, -200, 1500);
  spaceship.rotateY(Math.PI);

  // animation
  starShipMixer = new THREE.AnimationMixer(spaceship);
  starShipAction = starShipMixer.clipAction(loader.animations[0]);
  starShipAction.timeScale = 0.01; // slow down
  starShipAction.play();
});

//https://sketchfab.com/3d-models/x-wing-04b0147bd4234e61ba21bbf7a73ceecc
starshipLoader.load("./public/x_-wing/scene.gltf", (loader) => {
  spaceship2 = loader.scene;
  scene.add(spaceship2);
  spaceship2.scale.set(15, 15, 15);
  spaceship2.position.set(0, -20, -1800);
  spaceship2.rotateY(Math.PI);
  spaceship2.rotateX(0.2);

  // animation
  starShipMixer2 = new THREE.AnimationMixer(spaceship2);
  starShipAction2 = starShipMixer2.clipAction(loader.animations[0]);
  starShipAction2.timeScale = 0.01; // slow down
  starShipAction2.play();
});

//https://sketchfab.com/3d-models/blackhole-74cbeaeae2174a218fe9455d77902b5c
const blackholeLoader = new GLTFLoader(loadingManager);
blackholeLoader.load("./public/blackhole/scene.gltf", (loader) => {
  blackhole = loader.scene;
  scene.add(blackhole);
  blackhole.scale.set(200, 200, 200);
  blackhole.rotateX(0.1);
  blackhole.rotateZ(-0.1);
  blackhole.position.set(-500, 0, -1800);

  // animation
  blackHoleMixer = new THREE.AnimationMixer(blackhole);
  blackHoleAction = blackHoleMixer.clipAction(loader.animations[0]);
  blackHoleAction.timeScale = 0.001; // slow down
  blackHoleAction.play();
});

// Sun
const sun_color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(1, 15);
const material = new THREE.MeshBasicMaterial({ color: sun_color });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.copy(sun_lightPosition);
sphere.scale.set(80, 80, 80);
scene.add(sphere);

// bloom renderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 1; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

// dynamic scene with camera
function moveCamera() {
  earth.visible = true;
  greetingText.visible = true;
  atmosphere.visible = true;
  iconText.visible = true;

  factor = document.body.getBoundingClientRect().y;
  starSpeed = factor + 4400; // offset
  if (starSpeed < 20) starSpeed = 20;

  cameraMovement = factor + 3500; // offset
  camera.position.z = cameraMovement;
  if (camera.position.z < 150) {
    camera.position.set(0, 0, -2000);
    earth.visible = false;
    atmosphere.visible = false;
    greetingText.visible = false;
    iconText.visible = false;
  }
}

// Speed of rotation for earth
function earthRotation() {
  // initial speed
  earth.rotateY(0.0005);
  if (-factor > 2500) earth.rotateY(0.01);
}

// Responsive to window's size
window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  console.log(width);
  const scale = width / 2000;
  greetingText.scale.set(scale, scale, scale);
  iconText.scale.set(scale, scale, scale);
  if (width < 1200) {
    greetingText.position.set(-244, 75, 3000);
    iconText.position.set(-244, -175, 3000);
  }
  if (width < 600) {
    greetingText.position.set(-144, 75, 3000);
    iconText.position.set(-144, -175, 3000);
  }
  renderer.render(scene, camera);
}

function animate() {
  document.body.onscroll = moveCamera;
  earthRotation();
  animatedStar(starSpeed);
  requestAnimationFrame(animate);
  // Animation for blackhole and starships
  blackHoleMixer && starShipMixer && starShipMixer2
    ? blackHoleMixer.update(0.5) &&
      starShipMixer.update(0.5) &&
      starShipMixer2.update(0.5)
    : null;
  renderer.render(scene, camera);
  bloomComposer.render();
  controls.update();
}

animate();
