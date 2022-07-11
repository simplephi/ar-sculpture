import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFGoogleTiltBrushMaterialExtension } from "three-icosa";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);
const gltfLoader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
camera.position.set(2, 2, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// レンダラーの準備
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, document.body);

const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
const directionalLight2 = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(10, 10, 0);
directionalLight2.position.set(-10, -10, 10);
scene.add(directionalLight);
scene.add(directionalLight2);

const amblight = new THREE.AmbientLight();
scene.add(amblight);

//gltfLoader.register(parser => new GLTFGoogleTiltBrushMaterialExtension(parser, '../../../assets/brushes/'));
gltfLoader.register(parser => new GLTFGoogleTiltBrushMaterialExtension(parser, 'https://icosa-gallery.github.io/three-icosa-template/brushes/'));

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
gltfLoader.setDRACOLoader(dracoLoader);

loadGltf('./assets/enthusiasmcenter/glb/enthusiasmcenter.glb');

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);
box.position.z = -5;
scene.add(box);

function animate() {
    requestAnimationFrame(animate);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

async function loadGltf(url) {
    const gltf = await gltfLoader.loadAsync(url);
    const loadedModel = gltf.scene;
    scene.add(loadedModel);
}