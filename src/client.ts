const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;
ctx.fillStyle = "orange";
ctx.fillRect(0, 0, 20, 20);

console.log('Hello from client.ts');