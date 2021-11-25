/*
 * App.ts
 * ===========
 * Entry from Webpack, generates Three.js View
 */

import Experience from './Experience/Experience';

class App {
  private experience: Experience;

  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector('#webgl');
    console.log(canvas);
    this.experience = new Experience(canvas);

    window.document.body.appendChild(canvas);
  }
}

const app = new App();
