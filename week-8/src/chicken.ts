class Chicken {
    constructor(public x: number, public y: number) {}

    moveUp(): void {
    }

    moveDown(): void {
    }

    moveLeft(): void {
    }

    moveRight(): void {
    }

    reset(): void {
        this.y = 550;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, 30, 30);
    }
}

export default Chicken;