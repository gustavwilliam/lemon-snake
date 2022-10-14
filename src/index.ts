import "./settings.ts"

const getCssVariable = (name: string) => {
    console.log('this is being claled ');
    const t = getComputedStyle(document.body).getPropertyValue(name);
    console.log(t);
    return t 
};
const colorDark = getCssVariable.bind(null, '--color-dark-3')
const colorLight = getCssVariable.bind(null, '--color-dark-1')

const getConfig = () => {
    const root = document.getElementById('game')!;
    const height: number = 12;
    const width: number = 20;
    const size: number = root.clientHeight/height;
    return {
        getHeight: () => height,
        getWidth: () => width,
        getSize: () => size,
        getRoot: () => root
    }
}

const getGameState = () => {
    const config = getConfig();
    const height = config.getHeight();
    const width = config.getWidth()
    const grid: number[][] = new Array(height).fill(0)
        .map(() => new Array(width).fill(0));

    return grid;
}

const getCanvas = (): HTMLCanvasElement => {
    const config = getConfig();
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.height = config.getRoot().clientHeight;
    canvas.width = config.getRoot().clientWidth;

    return canvas;
}

const canvas = getCanvas();

const getCtx = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    return canvas.getContext('2d')!;
}

const getBox = (ctx: CanvasRenderingContext2D, size: number) => {
    return {
        drawBox: (x: number, y: number) => ctx.fillRect(y, x, size, size)
    }
}

const drawGridBox = (grid: number[][], ctx: CanvasRenderingContext2D) => {
    const config = getConfig();
    const box = getBox(ctx, config.getSize());
    const dark = colorDark(), light = colorLight();

    grid.forEach((row: number[], i: number) => {
        row.forEach((value: number, j: number) => {
            ctx.fillStyle = (i+j)%2 ? light : dark;
            box.drawBox(i*10, j*10);
        })
    })
}

export const reDraw = () => {
    drawGridBox(getGameState(), getCtx(canvas));
}

getConfig().getRoot().appendChild(canvas);
