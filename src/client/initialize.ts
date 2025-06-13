export function initializeCanvas(canvasElement: HTMLCanvasElement, renderingContext: CanvasRenderingContext2D) {
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