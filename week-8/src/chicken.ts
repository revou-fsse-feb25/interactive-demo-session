class Chicken {
  constructor(public x: number, public y: number) {}

  moveUp(): void {
    console.log(this.x);
    this.y = this.y - 30;
  }

  moveDown(): void {
    console.log(this.y);
    this.y += this.y + 30 < 580 ? 30 : 0;
  }

  moveLeft(): void {
    this.x = Math.max(0, this.x - 30);
  }

  moveRight(): void {
    this.x = this.x + 30 < 770 ? this.x + 30 : 770;
  }

  reset(): void {
    this.x = 400;
    this.y = 550;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 30, 30);
  }
}

export default Chicken;
