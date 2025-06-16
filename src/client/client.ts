import { initializeWindow } from "./utils";

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const renderingContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;

const draw = () => {
    renderingContext.fillStyle = 'orange';
    const margin = 8;
    renderingContext.fillRect(margin, margin, canvasElement.width - margin * 2, canvasElement.height - margin * 2);

    renderingContext.fillStyle = 'black';
    renderingContext.font = '24px Arial';
    renderingContext.fillText('Hello World', 100, 100);
};

initializeWindow({ window, canvasElement, renderingContext }, draw);