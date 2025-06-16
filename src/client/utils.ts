import { DocumentObjectModelElements } from "./DocumentObjectModelElements";

export const resizeCanvas = (canvasElement: HTMLCanvasElement, renderingContext: CanvasRenderingContext2D) => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvasElement.style.width = `${width}px`;
    canvasElement.style.height = `${height}px`;
    canvasElement.width = width * devicePixelRatio;
    canvasElement.height = height * devicePixelRatio;

    // TODO look into this further. Text is still crisp without this transform, and setting the transform causes the canvas to be larger than the window.
    // renderingContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

export const initializeWindow = (domObjects: DocumentObjectModelElements, draw: Function) => {
    const resizeDelay = 100; // ms
    let resizeTimeout: number | undefined;
    domObjects.window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
            resizeCanvas(domObjects.canvasElement, domObjects.renderingContext);
            draw();
        }, resizeDelay);
    });

    resizeCanvas(domObjects.canvasElement, domObjects.renderingContext);
    draw();
}