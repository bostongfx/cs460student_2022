import * as THREE from './three.js-master/three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load('assets/armadilo.ply', function (ply) {
    console.log(ply)
    const root = ply.scene;
    root.scale.set(0.03,0.03,0.03)

    scene.add(root);
}, function (xhr) {
    console.log((xhr.loader / xhr.total * 100) + "% loaded")

}, function (error) {
        console.log('An error occurred')

})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 5)
scene.add(light)

const sizes = {
    width: window.innerWidth,
    heigh: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigh, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.heigh)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true
renderer.render(scene, camera)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()