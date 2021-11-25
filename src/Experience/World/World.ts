import Experience from '../Experience';
import Visitor from '../Visitor/Visitor';
import { Box } from './Box';
import Environment from './Environment';

export default class World {
  experience: Experience;
  mainBox: Box;
  environment: Environment;

  constructor() {
    this.experience = Experience.getInstance();
    this.environment = new Environment();

    this.mainBox = new Box('MainBox', this.experience.debug.ui);

    const onVisite = this.experience.debug.ui.addButton({ title: 'On visite' });

    onVisite.on('click', () => {
      const visitor = new Visitor();

      this.mainBox.accept(visitor);

      console.log('----- FINISH -----');

      console.log(visitor.xmlObject);

      console.log(visitor.export());
    });
  }
}
