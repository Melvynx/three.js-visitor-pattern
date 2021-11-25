import * as THREE from 'three';
import { LineSegments, Vector3 } from 'three';
import { FolderApi, Pane } from 'tweakpane';
import Experience from '../Experience';
import { randomHexColor } from '../utils';
import { ShapeType, VisitorInterface } from '../Visitor/interface/Shape';
import Visitor from '../Visitor/Visitor';
import Sphere from './Sphere';
import Square from './Square';

export class Box implements VisitorInterface, ShapeType {
  type = 'Box';
  childrens: ShapeType[] = [];
  group: THREE.Group;
  experience: Experience;
  folder: FolderApi;
  name: string;
  childrenCount = 0;
  nestedIndex: number;
  sizes: THREE.Vector3;
  positions: THREE.Vector3;
  parent?: Box;
  line: LineSegments;
  side: 'right' | 'left' | 'base';

  constructor(name: string, gui: Pane | FolderApi, parent?: Box) {
    this.name = name;
    this.experience = Experience.getInstance();
    this.nestedIndex = parent?.nestedIndex + 1 || 0;
    this.parent = parent;
    this.side = this.parent
      ? this.parent.childrenCount > 0
        ? 'left'
        : 'right'
      : 'base';

    this.group = new THREE.Group();
    this.experience.scene.add(this.group);

    this.folder = gui.addFolder({
      title: `${this.type}-${this.name}`,
      expanded: parent === undefined,
    });

    const addSquare = this.folder.addButton({
      title: 'Add Square',
    });
    const addSphere = this.folder.addButton({
      title: 'Add Sphere',
    });
    const addBox = this.folder.addButton({
      title: 'Add BOX',
    });
    addSquare.on('click', () => this.addSquare());
    addSphere.on('click', () => this.addSphere());
    addBox.on('click', () => this.addBox());

    this.baseGui();
    this.initEdges();

    if (this.nestedIndex === 0 || this.nestedIndex === 1) {
      this.addBox();
    }
  }

  initEdges() {
    this.sizes = new THREE.Vector3(1, 2, 3);
    this.positions = new THREE.Vector3(
      this.parent?.positions.x ?? 0,
      this.parent?.positions.y ?? 0,
      this.parent?.positions.z ?? 0
    );

    if (this.parent) {
      const { sizes: parentSizes } = this.parent;
      if (parentSizes.x + 0.6 >= parentSizes.z) {
        if (this.side === 'right') {
          this.positions.x = this.parent.positions.x + this.parent.sizes.x / 4;
        }
        if (this.side === 'left') {
          this.positions.x = this.parent.positions.x - this.parent.sizes.x / 4;
        }
      } else {
        if (this.side === 'right') {
          this.positions.z = this.parent.positions.z + this.parent.sizes.z / 4;
        }
        if (this.side === 'left') {
          this.positions.z = this.parent.positions.z - this.parent.sizes.z / 4;
        }
      }
    }

    const newSizes = this.parent?.sizes
      ? getNewSizes(this.parent.sizes)
      : new Vector3(
          25 - this.nestedIndex * 2,
          25 - this.nestedIndex * 2,
          25 - this.nestedIndex * 2
        );

    if (this.parent === undefined) {
      this.sizes = newSizes;
    } else {
      if (this.nestedIndex === 3) {
        console.log(newSizes.x, '<', newSizes.z);
      }
      if (newSizes.x + 0.6 < newSizes.z) {
        this.sizes.set(newSizes.x, newSizes.y, newSizes.z / 2);
      } else {
        this.sizes.set(newSizes.x / 2, newSizes.y, newSizes.z);
      }
    }

    const geometry = new THREE.BoxGeometry(this.sizes.x, this.sizes.y, this.sizes.z);
    const edges = new THREE.EdgesGeometry(geometry);
    this.line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: randomHexColor() })
    );
    this.line.position.set(this.positions.x, this.positions.y, this.positions.z);

    this.group.add(this.line);
  }

  baseGui() {
    this.folder.addInput(this.group, 'position', {
      y: { step: 0.1, max: 5, min: -5 },
      z: { step: 0.1, max: 5, min: -5 },
      x: { step: 0.1, max: 5, min: -5 },
    });
  }

  accept(visitor: Visitor) {
    visitor.visitBox(this);
  }

  addBox() {
    if (this.childrens.length >= 2) {
      alert('Max 2 children');
      return;
    }
    if (this.nestedIndex >= 4) {
      alert('Max 4 nested box');
      return;
    }
    const box = new Box(`${this.name}-${this.childrenCount}`, this.folder, this);
    this.childrens.push(box);
    this.group.add(box.group);
    this.childrenCount += 1;
  }

  addSphere() {
    const square = new Sphere(`Square-${this.childrenCount}`, this.folder, this);
    this.addChildren(square);
  }

  addSquare() {
    const square = new Square(`Square-${this.childrenCount}`, this.folder, this);
    this.addChildren(square);
  }

  addChildren(square: ShapeType) {
    this.childrens.push(square);
    this.group.add(square.group);
    this.childrenCount += 1;
  }
}

const getNewSizes = (sizes: THREE.Vector3) => {
  const control = 1;
  const newSizes = new THREE.Vector3(
    sizes.x - control,
    sizes.y - control,
    sizes.z - control
  );
  return newSizes;
};
