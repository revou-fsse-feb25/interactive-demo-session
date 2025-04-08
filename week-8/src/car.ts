class Car {
    public x: number;
    public y: number;
    private speed: number;
    private direction: number;

    constructor() {
        this.direction = 1;
        // Adjust starting position to be more visible
        this.x = 100;
        // Adjust vertical position to be more spread out
        this.y = 250;
        // Increase speed range for better visibility
        this.speed = 10;
    }

    update(): void {
        this.x += this.speed * this.direction;
    }

    isVisible(): boolean {
        // Expand visible area
        return this.x > -100 && this.x < 900;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // Make cars more visible with a border
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, 100, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, 60, 30);
    }
}

export default Car;