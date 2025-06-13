const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const renderingContext = canvasElement.getContext("2d") as CanvasRenderingContext2D;
// initialize canvas
const initializeCanvas = (canvasElement: HTMLCanvasElement, renderingContext: CanvasRenderingContext2D) => {
    // Get device pixel ratio
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size (CSS pixels)
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvasElement.style.width = width + 'px';
    canvasElement.style.height = height + 'px';

    // Set actual canvas size (scaled for device pixel ratio)
    canvasElement.width = width * dpr;
    canvasElement.height = height * dpr;

    // Scale context to account for device pixel ratio
    renderingContext.setTransform(dpr, 0, 0, dpr, 0, 0);
}
initializeCanvas(canvasElement, renderingContext);

// Now draw text as usual
renderingContext.font = '24px Arial';
renderingContext.fillText('Hello World', 50, 100);