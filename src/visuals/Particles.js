import { Visualization } from "./Visualization.js";

export class Particles extends Visualization
{
    constructor() {
        super();
        this.binCount = 1024; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
        this.particles =  new Array(this.binCount);
        this.name = 'particles';
        this.displayName = 'Particles';
    }

    setup(sketch, fourier) {
        // instantiate the particles.
        for (let i = 0; i < this.particles.length; i++) {
            let x = sketch.map(i, 0, this.binCount, 0, sketch.width * 2);
            let y = sketch.random(0, sketch.height);
            let position = sketch.createVector(x, y);
            this.particles[i] = this.makeParticle(sketch, position);
        }
    }


    draw(sketch, fourier) {
        // sketch.background(0, 0, 0, 100);

        // returns an array with [binCount] amplitude readings from lowest to highest frequencies
        let spectrum = fourier.analyze(this.binCount);

        // update and draw all [binCount] particles!
        // Each particle gets a level that corresponds to
        // the level at one bin of the FFT spectrum.
        // This level is like amplitude, often called "energy."
        // It will be a number between 0-255.
        for (let i = 0; i < this.binCount; i++) {
            let thisLevel = sketch.map(spectrum[i], 0, 255, 0, 1);

            // update values based on amplitude at this part of the frequency spectrum
            this.particles[i].update(thisLevel);

            // draw the particle
            this.particles[i].draw();

            // update x position (in case we change the bin count while live coding)
            this.particles[i].position.x = sketch.map(i, 0, this.binCount, 0, sketch.width * 2);
        }
    }

    makeParticle(sketch, position) {
        return {
            position,
            scale: sketch.random(0, 1),
            speed: sketch.createVector(0, sketch.random(0, 10) ),
            color: [sketch.random(0, 255), sketch.random(0,255), sketch.random(0,255)],
            update: function (level) {
                this.position.y += this.speed.y / (level * 2);

                if (this.position.y > sketch.height) {
                    this.position.y = 0;
                }

                this.diameter = sketch.map(level, 0, 1, 0, 100) * this.scale;
            },
            draw: function () {
                sketch.fill(this.color);
                sketch.ellipse(
                    this.position.x, this.position.y,
                    this.diameter, this.diameter
                );
            }
        }
    };
}