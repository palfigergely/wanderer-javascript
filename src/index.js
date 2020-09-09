'use strict';

import { game, hero } from './game';

// Acquire the rendering context
const canvas = document.querySelector('.main-canvas');
export const ctx = canvas.getContext('2d');
ctx.font = "20px Arial";

// Function to handle the key press events
function onKeyPress(event) {
  // Handle arrow keys
  switch (event.keyCode) {
    case 37:
        hero.moveLeft();
        break;
    case 65:
        hero.moveLeft();
        break;
    case 38:
        hero.moveUp();
        break;
    case 87:
        hero.moveUp();
        break;
    case 39:
        hero.moveRight();
        break;
    case 68:
        hero.moveRight();
        break;
    case 40:
        hero.moveDown();
        break;
    case 83:
        hero.moveDown();
        break;
    case 32:
        hero.battle();
        break;    
  }
}
// GAME LEVEL
let startlevel = 1;

// START THE PROGRAM
window.onload = () => {
    // Listen on pressing the keys
    document.body.addEventListener('keydown', onKeyPress);
    game(startlevel);
};