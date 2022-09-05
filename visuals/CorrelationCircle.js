import { Visualization } from "./Visualization.js";

export class CorrelationCircle extends Visualization
{
    constructor() {
        super();
        this.name = 'correlationcircle';
        this.displayName = 'Correlation Circle (Incomplete)';
        this.bNormalize = true;
        this.centerClip = 0;
    }

    draw(sketch, fourier) {
        sketch.stroke(237, 34, 93, 120);
        sketch.translate(sketch.width/2, sketch.height/2);

        // min radius of ellipse
        let minRad = 2;

        // max radius of ellipse
        let maxRad = sketch.height;

        // array of values from -1 to 1
        let timeDomain = fourier.waveform(1024, 'float32');
        let corrBuff = this.autoCorrelate(timeDomain);

        let len = corrBuff.length;


        // draw a circular shape
        sketch.beginShape();

        for (let i = 0; i < len; i++) {
            let angle = sketch.map(i, 0, len, 0, sketch.HALF_PI);
            let offset = sketch.map(sketch.abs(corrBuff[i]), 0, 1, 0, maxRad) + minRad;
            let x = (offset) * sketch.cos(angle);
            let y = (offset) * sketch.sin(angle);
            sketch.curveVertex(x, y);
        }

        for (let i = 0; i < len; i++) {
            let angle = sketch.map(i, 0, len, p5.HALF_PI, p5.PI);
            let offset = sketch.map(sketch.abs(corrBuff[len - i]), 0, 1, 0, maxRad) + minRad;
            let x = (offset) * sketch.cos(angle);
            let y = (offset) * sketch.sin(angle);
            sketch.curveVertex(x, y);
        }

        // semi circle with mirrored
        for (let i = 0; i < len; i++) {
            let angle = sketch.map(i, 0, len, p5.PI, p5.HALF_PI + p5.PI);
            let offset = sketch.map(sketch.abs(corrBuff[i]), 0, 1, 0, maxRad) + minRad;
            let x = (offset) * sketch.cos(angle);
            let y = (offset) * sketch.sin(angle);
            sketch.curveVertex(x, y);
        }

        for (let i = 0; i < len; i++) {
            let angle = sketch.map(i, 0, len, p5.HALF_PI + p5.PI, p5.TWO_PI);
            let offset = sketch.map(sketch.abs(corrBuff[len - i]), 0, 1, 0, maxRad) + minRad;
            let x = (offset) * sketch.cos(angle);
            let y = (offset) * sketch.sin(angle);
            sketch.curveVertex(x, y);
        }


        sketch.endShape(p5.CLOSE);

    }


    autoCorrelate(buffer) {
        let newBuffer = [];
        let nSamples = buffer.length;

        let autocorrelation = [];

        // center clip removes any samples under 0.1
        if (this.centerClip) {
            let cutoff = centerClip;
            for (let i = 0; i < buffer.length; i++) {
                let val = buffer[i];
                buffer[i] = Math.abs(val) > cutoff ? val : 0;
            }
        }

        for (let lag = 0; lag < nSamples; lag++){
            let sum = 0;
            for (let index = 0; index < nSamples; index++){
                let indexLagged = index+lag;
                let sound1 = buffer[index];
                let sound2 = buffer[indexLagged % nSamples];
                let product = sound1 * sound2;
                sum += product;
            }

            // average to a value between -1 and 1
            newBuffer[lag] = sum/nSamples;
        }

        if (this.bNormalize){
            let biggestVal = 0;
            for (let index = 0; index < nSamples; index++){
                if (Math.abs(newBuffer[index]) > biggestVal){
                    biggestVal = Math.abs(newBuffer[index]);
                }
            }
            // dont divide by zero
            if (biggestVal !== 0) {
                for (let index = 0; index < nSamples; index++){
                    newBuffer[index] /= biggestVal;
                }
            }
        }

        return newBuffer;
    }

}