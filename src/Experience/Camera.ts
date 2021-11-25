import * as THREE from 'three';
import Experience from './Experience';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
  experience: Experience;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;

  constructor() {
    this.experience = Experience.getInstance();

    const { canvas, sizes } = this.experience;

    this.instance = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      1000
    );

    this.controls = new OrbitControls(
      this.instance,
      this.experience.renderer.instance.domElement
    );

    this.setInstance();
  }

  setInstance() {
    this.instance.position.set(35, 35, 45);
    this.experience.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect =
      this.experience.sizes.width / this.experience.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
