import { DirectionalLight, sRGBEncoding } from 'three';
import Experience from '../Experience';
import * as THREE from 'three';

export default class Environment {
  experience: Experience;

  constructor() {
    this.experience = Experience.getInstance();

    this.setSunLight();
    this.setAmbiantLight();
  }

  setSunLight() {
    const { scene } = Experience.getInstance();

    const directionalLight = new DirectionalLight('#ffffff', 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.normalBias = 0.05;
    directionalLight.position.set(3.5, 2, -1.25);
    scene.add(directionalLight);
  }

  setAmbiantLight() {
    const { scene } = Experience.getInstance();

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.6);
    scene.add(ambientLight);
  }
}
