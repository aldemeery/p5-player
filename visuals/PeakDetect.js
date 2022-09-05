import { Visualization } from "./Visualization.js";

export class PeakDetect extends Visualization
{
    constructor() {
        super();
        this.ellipseWidth = 10;
        this.peakDetect = new p5.PeakDetect(4000, 12000, 0.2);
        this.name = 'peakdetect';
        this.displayName = 'Peak Detect';
    }

    draw(sketch, fourier) {
        // peakDetect accepts an fft post-analysis
        fourier.analyze();
        this.peakDetect.update(fourier);

        if (this.peakDetect.isDetected ) {
            this.ellipseWidth = 300;
        } else {
            this.ellipseWidth *= 0.95;
        }

        sketch.ellipse(sketch.width / 2, sketch.height / 2, this.ellipseWidth, this.ellipseWidth);
    }
}