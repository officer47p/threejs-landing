import * as THREE from "three";
import "./style.css"
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene();

// Create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light.position.set(0, 10, 10)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 20 
scene.add(camera)



// Renderer
const canvas = document.querySelector(".webgl") as HTMLElement
const renderer = new THREE.WebGLRenderer({canvas: canvas!})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  // light.rotation.x += 0.2
  // mesh.position.x += 0.1
  controls.update()
  // console.log(camera.position)
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Timeline magiccc
const tl = gsap.timeline({defaults: {
  duration: 1
}})
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})