import Chicken from "./chicken";
import Car from "./car";

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private chicken: Chicken;
  private cars: Car[];
  private score: number;
  private gameOver: boolean;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 800;
    this.canvas.height = 600;
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d")!;
    this.chicken = new Chicken(400, 550);
    this.cars = [];
    this.score = 0;
    this.gameOver = false;

    this.init();
  }

  private init(): void {
    document.addEventListener("keydown", this.handleInput.bind(this));
    this.spawnCars();
    this.gameLoop();
  }

  private handleInput(e: KeyboardEvent): void {
    if (this.gameOver) {
      if (e.key === "Enter") {
        this.resetGame(); //Resets game when pressing Enter
      }
    }

    switch (e.key) {
      case "ArrowUp":
        // if (this.chicken.y >= 100 && this.chicken.y <= 500) {
        //   this.score += 1;
        // }
        this.chicken.moveUp();
        break;
      case "ArrowDown":
        this.chicken.moveDown();
        break;
      case "ArrowLeft":
        this.chicken.moveLeft();
        break;
      case "ArrowRight":
        this.chicken.moveRight();
        break;
    }
  }

  private spawnCars(): void {
    setInterval(() => {
      if (!this.gameOver) {
        const newCar = new Car();
        // Check if new car's position overlaps with any existing car
        const hasOverlap = this.cars.some(
          (car) => Math.abs(car.y - newCar.y) < 35 // 30px height + 10px minimum gap
        );
        // Only add the car if there's no overlap
        if (!hasOverlap) {
          this.cars.push(newCar);
        }
      }
    }, 200);
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
    this.cars = this.cars.filter((car) => car.isVisible());
    this.cars.forEach((car) => car.update());

    this.cars.forEach((car) => {
      if (this.checkCollision(car, this.chicken)) {
        this.gameOver = true;
      }
    });

    if (this.chicken.y <= 0) {
      this.chicken.reset();
      this.score++;
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(0, 100, this.canvas.width, 400);

    this.ctx.fillStyle = "black";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);

    this.chicken.draw(this.ctx);
    this.cars.forEach((car) => car.draw(this.ctx));
  }

  private drawGameOver(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = "48px Arial";
    this.ctx.fillText("Game Over!", 300, 250);
    this.ctx.fillText(`Score: ${this.score}`, 320, 320);
    // Draw reset button
    this.ctx.fillStyle = "#4CAF50";
    this.ctx.fillRect(350, 350, 100, 40);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("Reset", 375, 375);
    if (this.gameOver) {
      this.canvas.addEventListener("click", this.handleClick.bind(this), {
        once: true,
      });
    }
  }

  private handleClick(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is within reset button bounds
    if (x >= 350 && x <= 450 && y >= 350 && y <= 390) {
      this.resetGame();
    }
  }

  private checkCollision(car: Car, chicken: Chicken): boolean {
    // Get the boundaries of both objects
    const carBounds = {
      left: car.x,
      right: car.x + 100, // car width is 100
      top: car.y,
      bottom: car.y + 30, // car height is 30
    };

    const chickenBounds = {
      left: chicken.x,
      right: chicken.x + 30, // chicken width is 30
      top: chicken.y,
      bottom: chicken.y + 30, // chicken height is 30
    };

    // Check if objects overlap in both horizontal and vertical directions
    const isOverlappingHorizontally =
      carBounds.left <= chickenBounds.right &&
      carBounds.right >= chickenBounds.left;

    const isOverlappingVertically =
      carBounds.top <= chickenBounds.bottom &&
      carBounds.bottom >= chickenBounds.top;

    // A collision occurs when objects overlap in BOTH directions
    return isOverlappingHorizontally && isOverlappingVertically;
  }
  private resetGame(): void {
    this.chicken = new Chicken(400, 550);
    this.cars = [];
    this.score = 0;
    this.gameOver = false;
    this.gameLoop();
  }
}

export default Game;
