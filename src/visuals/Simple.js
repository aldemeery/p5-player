import { Visualization } from "./Visualization.js";

export class Simple extends Visualization
{
    constructor() {
        super();
        this.name = 'simple';
        this.displayName = 'Simple';
    }

    draw(sketch, fourier) {
        fourier.analyze();
        const bass = fourier.getEnergy("bass");
        const lowMid = fourier.getEnergy("lowMid");
        const mid = fourier.getEnergy("mid");
        const highMid = fourier.getEnergy("highMid");
        const treble = fourier.getEnergy("treble");

        const bassHeight = sketch.map(bass, 0, 255, 10, sketch.height);
        const lowMidHeight = sketch.map(lowMid, 0, 255, 10, sketch.height);
        const midHeight = sketch.map(mid, 0, 255, 10, sketch.height);
        const highMidHeight = sketch.map(highMid, 0, 255, 10, sketch.height);
        const trebleHeight = sketch.map(treble, 0, 255, 10, sketch.height);

        sketch.fill(bass, 0, 155);
        sketch.rect(sketch.width / 2 - 115, sketch.height - bassHeight, 30, bassHeight, 5);


        sketch.fill(lowMid, 0, 155);
        sketch.rect(sketch.width / 2 - 65, sketch.height - lowMidHeight, 30, lowMidHeight, 5);


        sketch.fill(mid, 0, 155);
        sketch.rect(sketch.width / 2 - 15, sketch.height - midHeight, 30, midHeight, 5);


        sketch.fill(highMid, 0, 155);
        sketch.rect(sketch.width / 2 + 35, sketch.height - highMidHeight, 30, highMidHeight, 5);


        sketch.fill(treble, 0, 155);
        sketch.rect(sketch.width / 2 + 85, sketch.height - trebleHeight, 30, trebleHeight, 5);
    }
}