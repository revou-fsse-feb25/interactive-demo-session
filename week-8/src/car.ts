class Car {
  public x: number;
  public y: number;
  private speed: number;
  private direction: number;
  private color: string;

  //Random car colors
  private static readonly COLORS = [
    "#FF0000", // red
    "#00FF00", // green
    "#0000FF", // blue
    "#FFD700", // gold
    "#FF69B4", // hot pink
    "#4B0082", // indigo
    "#FF4500", // orange red
    "#8A2BE2", // blue violet
  ];

  constructor() {
    this.direction = Math.random() < 0.5 ? 1 : -1;
    // Adjust starting position to be more visible
    this.x = this.direction === 1 ? 0 : 800;
    // Adjust vertical position to be more spread out
    this.y = Math.floor(Math.random() * 370) + 115;
    // Increase speed range for better visibility
    this.speed = Math.floor((Math.random() + 1) * 3.2);
    this.color = Car.COLORS[Math.floor(Math.random() * Car.COLORS.length)];
  }

  update(): void {
    this.x += this.speed * this.direction;
  }

  isVisible(): boolean {
    // Expand visible area
    return this.x > -200 && this.x < 850;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.direction === -1) {
      // Flip the car horizontally when moving left
      ctx.scale(-1, 1);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.x - 100, this.y, 100, 30);
      ctx.strokeStyle = "black";
      ctx.strokeRect(-this.x - 100, this.y, 60, 30);
    } else {
      // Normal drawing for right-moving cars
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, 100, 30); //Panjang dan lebar car
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, 60, 30);
    }
    ctx.restore();
  }
}

export default Car;
