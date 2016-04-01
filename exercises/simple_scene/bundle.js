'use strict';

require('three');
require('three/examples/js/renderers/Projector.js');
require('three/examples/js/renderers/CanvasRenderer.js');
require('three/examples/js/renderers/OrbitControls.js');

var container;
var camera, scene, renderer, sphere;
var cameraControls;
var light;
init();
animate();
function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

  camera.position.set(0, 100, 1000);
  camera.lookAt(scene.position);

  // Grid
  var size = 500;
  var step = 100;
  var geometry = new THREE.Geometry();
  for (var i = -size; i <= size; i += step) {
    geometry.vertices.push(new THREE.Vector3(-size, 0, i));
    geometry.vertices.push(new THREE.Vector3(size, 0, i));
    geometry.vertices.push(new THREE.Vector3(i, 0, -size));
    geometry.vertices.push(new THREE.Vector3(i, 0, size));
  }
  var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.5 });
  var line = new THREE.LineSegments(geometry, material);
  scene.add(line);

  // Sphere
  geometry = new THREE.SphereGeometry(100, 26, 18);
  material = new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = 0;
  sphere.position.y = 100;
  scene.add(sphere);

  // Lights
  var ambientLight = new THREE.AmbientLight(Math.random() * 0x202020);
  scene.add(ambientLight);
  var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);
  light = new THREE.PointLight(0xff0000, 1, 500);
  scene.add(light);
  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // CONTROL 
  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControls.target.set(0, 0, 0);
  cameraControls.addEventListener('c  hange', render);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var timer = Date.now() * 0.01;
  var pos = 100;
  bounce();
  function bounce() {
    sphere.position.y = Math.cos(timer) * pos;
  }

  renderer.render(scene, camera);
}