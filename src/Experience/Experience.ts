import * as THREE from 'three';
import Camera from './Camera';
import Debug from './Debug';
import Renderer from './Renderer';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import World from './World/World';

// import orbitcontrols

// create a singloton
let instance: Experience = null;

export default class Experience {
  canvas?: HTMLCanvasElement;
  debug: Debug;
  sizes: Sizes;
  time: Time;
  scene: THREE.Scene;
  camera: Camera;
  renderer: Renderer;
  world: World;

  constructor(canvas?: HTMLCanvasElement) {
    if (instance !== null) {
      throw new Error('Experience is a singleton');
    }

    instance = this;

    // Config
    this.canvas = canvas;

    // Utils
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new THREE.Scene();
    this.renderer = new Renderer();

    this.camera = new Camera();

    this.world = new World();

    // Event
    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }

  static getInstance(): Experience {
    if (!instance) {
      throw new Error('Experience is not initialized');
    }

    return instance;
  }
}
