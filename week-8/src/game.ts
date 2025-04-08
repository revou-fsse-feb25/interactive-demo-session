import Chicken from './chicken';
import Car from './car';

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private chicken: Chicken;
    private cars: Car[];
    private score: number;
    private gameOver: boolean;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d')!;
        this.chicken = new Chicken(400, 550);
        this.cars = [];
        this.score = 0;
        this.gameOver = false;

        this.init();
    }

    private init(): void {
        document.addEventListener('keydown', this.handleInput.bind(this));
        this.spawnCars();
        this.gameLoop();
    }

    private handleInput(e: KeyboardEvent): void {
        if (this.gameOver) return;

        switch(e.key) {
            case 'ArrowUp':
                this.chicken.moveUp();
                break;
            case 'ArrowDown':
                this.chicken.moveDown();
                break;
            case 'ArrowLeft':
                this.chicken.moveLeft();
                break;
            case 'ArrowRight':
                this.chicken.moveRight();
                break;
        }
    }

    private spawnCars(): void {
        // Spawn cars more frequently (every 1 second instead of 2)
        setInterval(() => {
            if (!this.gameOver) {
                this.cars.push(new Car());
            }
        }, 5000);
    }

    private gameLoop(): void {
        if (this.gameOver) {
            this.drawGameOver();
            return;
        }

        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private update(): void {
        this.cars = this.cars.filter(car => car.isVisible());
        this.cars.forEach(car => car.update());

        this.cars.forEach(car => {
            if (this.checkCollision(car, this.chicken)) {
                this.gameOver = true;
            }
        });

        if (this.chicken.y <= 50) {
            
        }
    }

    private draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 100, this.canvas.width, 400);

        this.ctx.fillStyle = 'black';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);

        this.chicken.draw(this.ctx);
        this.cars.forEach(car => car.draw(this.ctx));
    }

    private drawGameOver(): void {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '48px Arial';
        this.ctx.fillText('Game Over!', 300, 250);
        this.ctx.fillText(`Score: ${this.score}`, 320, 320);
    }

    private checkCollision(car: Car, chicken: Chicken): boolean {
        return (false);
    }
}

export default Game;