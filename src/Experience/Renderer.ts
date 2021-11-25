import {
  CineonToneMapping,
  PCFSoftShadowMap,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';
import Experience from './Experience';

export default class Renderer {
  experience: Experience;
  instance: WebGLRenderer;

  constructor() {
    this.experience = Experience.getInstance();

    this.instance = new WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
    });
    this.setInstance();
  }

  setInstance() {
    const { sizes } = this.experience;

    this.instance.setPixelRatio(sizes.pixelRatio);
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFSoftShadowMap;
    this.instance.setClearColor('#211d20');
    this.instance.setSize(sizes.width, sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  resize() {
    const { sizes } = this.experience;

    this.instance.setSize(sizes.width, sizes.height);
    this.instance.setPixelRatio(sizes.pixelRatio);
  }

  update() {
    const { camera, scene } = this.experience;

    this.instance.render(scene, camera.instance);
  }
}
