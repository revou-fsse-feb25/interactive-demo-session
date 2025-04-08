import Game from './game';

// Remove any existing canvas elements
const existingCanvas = document.querySelectorAll('canvas');
existingCanvas.forEach(canvas => canvas.remove());

// Create single game instance
new Game();