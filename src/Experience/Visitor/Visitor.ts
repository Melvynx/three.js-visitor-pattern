import { Box } from '../World/Box';
import Shape from '../World/Shape';
import Sphere from '../World/Sphere';
import Square from '../World/Square';

type XmlObject = Record<string, { name: string; children: XmlObject }>;

export default class Visitor {
  xmlObject: XmlObject = {};

  visitSquare(square: Square) {
    console.log('Serialize Square');
    const objectToAdd = this.getObjectToAdd(square);
    objectToAdd[square.name] = { name: `Square, ${square.type}`, children: {} };
  }

  visitSphere(sphere: Sphere) {
    console.log('Serialize Sphere');
    const objectToAdd = this.getObjectToAdd(sphere);
    objectToAdd[sphere.name] = { name: `sphere, ${sphere.type}`, children: {} };
  }

  visitBox(box: Box) {
    console.log('Serialize Box');
    const objectToAdd = this.getObjectToAdd(box);
    objectToAdd[box.name] = { name: box.name, children: {} };

    box.childrens.forEach((child) => {
      child.accept(this);
    });
  }

  visitShape(shape: Shape) {
    throw new Error(`Method not implemented ${shape}.`);
  }

  getObjectToAdd(element: { parent?: Box; name: string }) {
    let objectToAdd: unknown = this.xmlObject;
    const parents = getMaxParent(element);

    let ok = true;

    while (ok) {
      if (!parents[0]) {
        ok = false;
        continue;
      }
      if (!objectToAdd[parents[0].name]) {
        ok = false;
        continue;
      }
      objectToAdd = objectToAdd[parents[0].name];
      parents.shift();
    }

    return objectToAdd;
  }

  export() {
    return JSON.stringify(this.xmlObject);
  }
}

const getMaxParent = (box: { parent?: Box }) => {
  let parent = box.parent;
  const parents = [box.parent];
  while (parent) {
    if (!parent.parent) {
      break;
    }
    parent = parent.parent;
    parents.push(parent);
  }
  return parents.reverse();
};
