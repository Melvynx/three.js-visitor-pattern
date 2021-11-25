import * as THREE from 'three';
import { FolderApi } from 'tweakpane';
import Experience from '../Experience';
import { randomHexColor } from '../utils';
import Visitor from '../Visitor/Visitor';
import { Box } from './Box';
import Shape from './Shape';

export default class Square extends Shape {
  instance: THREE.Mesh;
  experience: Experience;
  settings: { size: number };

  constructor(name: string, gui: FolderApi, parent: Box) {
    super(name, gui, parent);
    this.type = 'Square';
    this.settings = {
      size: 1,
    };

    this.experience = Experience.getInstance();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: randomHexColor(),
      side: THREE.DoubleSide,
    });
    this.instance = new THREE.Mesh(geometry, material);

    this.instance.scale.set(
      this.settings.size,
      this.settings.size,
      this.settings.size
    );
    this.group.add(this.instance);

    this.initGui();
    this.initInstance();
  }

  initInstance() {
    this.instance.position.x =
      Math.floor(Math.random() * this.parent.sizes.x) - this.parent.sizes.x / 2;
    this.instance.position.y =
      Math.floor(Math.random() * this.parent.sizes.y) - this.parent.sizes.y / 2;
    this.instance.position.z =
      Math.floor(Math.random() * this.parent.sizes.z) - this.parent.sizes.z / 2;
  }

  initGui() {
    const size = this.folder.addInput(this.settings, 'size', {
      step: 0.1,
      min: 0.1,
      max: 1,
    });
    size.on('change', (size) => {
      const value = size.value;
      this.instance.scale.set(value, value, value);
    });
    const color = this.folder.addInput({ color: '#129200' }, 'color');
    color.on('change', (color) => {
      const value = color.value;
      const threeColor = new THREE.Color(value);
      if (this.instance.material instanceof THREE.MeshStandardMaterial) {
        this.instance.material.color.set(threeColor);
      }
    });
  }

  override accept(visitor: Visitor) {
    console.log('Accept Visitor from Square');
    visitor.visitSquare(this);
  }

  destroy() {
    this.instance.geometry.dispose();
    (this.instance.material as THREE.Material).dispose();
    this.folder.dispose();

    this.experience.scene.remove(this.group);
  }
}
