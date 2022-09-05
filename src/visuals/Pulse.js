import { Visualization } from "./Visualization.js";

export class Pulse extends Visualization
{
    constructor() {
        super();
        this.name = 'pulse';
        this.displayName = 'Pulse';
        this.amplitude = new p5.Amplitude();
        this.amplitude.smooth(0.6);
        this.prevLevels = new Array(60);
    }

    draw(sketch, fourier) {
        sketch.noStroke();
        sketch.rectMode(p5.CENTER);
        sketch.colorMode(p5.HSB);

        sketch.background(20, 20);
        sketch.fill(255, 10)

        let level = this.amplitude.getLevel();

        // rectangle variables
        let spacing = 10;
        let w = sketch.width/ (this.prevLevels.length * spacing);

        let minHeight = 2;
        let roundness = 20;

        // add new level to end of array
        this.prevLevels.push(level);

        // remove first item in array
        this.prevLevels.splice(0, 1);

        // loop through all the previous levels
        for (let i = 0; i < this.prevLevels.length; i++) {

            let x = sketch.map(i, this.prevLevels.length, 0, sketch.width / 2, sketch.width);
            let h = sketch.map(this.prevLevels[i], 0, 0.5, minHeight, sketch.height);

            let alphaValue = this.logMap(i, 0, this.prevLevels.length, 1, 250);

            let hueValue = sketch.map(h, minHeight, sketch.height, 200, 255);

            sketch.fill(hueValue, 255, 255, alphaValue);

            sketch.rect(x, sketch.height / 2, w, h);
            sketch.rect(sketch.width - x, sketch.height / 2, w, h);
        }
    }

    logMap(val, inMin, inMax, outMin, outMax) {
        let offset = 0;
        if (inMax === 0 || inMin === 0) {
            offset = 1;
            inMin += offset;
            inMax += offset;
        }
        let a = (outMin - outMax) / Math.log10(inMin / inMax);
        let b = outMin - a * Math.log10(inMin);

        return a * Math.log10(val + offset) + b;
    }
}