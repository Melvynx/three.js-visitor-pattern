import { Group } from 'three';
import { FolderApi, Pane } from 'tweakpane';
import Experience from '../Experience';
import { ShapeType } from '../Visitor/interface/Shape';
import Visitor from '../Visitor/Visitor';
import { Box } from './Box';

class Shape implements ShapeType {
  type = 'Shape';
  children?: Box;
  group: Group;
  experience: Experience;
  folder: FolderApi;
  name: string;
  parent: Box;

  constructor(name: string, gui: Pane | FolderApi, parent: Box) {
    this.name = name;
    this.experience = Experience.getInstance();
    this.group = new Group();
    this.parent = parent;

    this.folder = gui.addFolder({
      title: `${this.type}-${this.name}`,
      expanded: false,
    });

    this.baseGui();
  }

  baseGui(): void {
    this.folder.addInput(this.group, 'position', {
      y: { step: 0.1, max: 5, min: -5 },
      z: { step: 0.1, max: 5, min: -5 },
      x: { step: 0.1, max: 5, min: -5 },
    });
  }

  accept(visitor: Visitor): void {
    visitor.visitShape(this);
  }
}

export default Shape;
