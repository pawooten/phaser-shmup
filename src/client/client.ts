import { initializeCanvas } from "./initialize";

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const renderingContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;
initializeCanvas(canvasElement, renderingContext);

// Now draw text as usual
renderingContext.font = '24px Arial';
renderingContext.fillText('Hello World', 50, 100);