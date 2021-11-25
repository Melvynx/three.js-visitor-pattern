import { Box } from 'src/Experience/World/Box';
import { Group } from 'three';
import Visitor from '../Visitor';

interface VisitorInterface {
  accept(visitor: Visitor): void;
}

interface ShapeType extends VisitorInterface {
  name: string;
  children?: Box;
  group: Group;
}

export type { VisitorInterface, ShapeType };
