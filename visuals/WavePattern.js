import { Visualization } from "./Visualization.js";

export class WavePattern extends Visualization
{
	constructor() {
		super();
		this.name = "wavepattern";
		this.displayName = "Wave Pattern";
	}

	//draw the wave form to the screen
	draw(sketch, fourier) {
		sketch.push();
		sketch.noFill();
		sketch.stroke(255, 0, 0);
		sketch.strokeWeight(2);

		sketch.beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = sketch.map(i, 0, wave.length, 0, sketch.width);
			var y = sketch.map(wave[i], -1, 1, 0, sketch.height);

			sketch.vertex(x, y);
		}

		sketch.endShape();
		sketch.pop();
	};
}