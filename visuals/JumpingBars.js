import { Visualization } from "./Visualization.js";

export class JumpingBars extends Visualization
{
	constructor() {
		super();
		this.name = "jumpingbars";
		this.displayName = 'Jumping Bars';
	}

	draw(sketch, fourier) {
		sketch.push();
		sketch.noFill();
		sketch.stroke(120, 250, 86);
		sketch.strokeWeight(2);

		let space_between_lines = sketch.width / 256;
		let spectrum = fourier.analyze();
		for (let i = 0; i < spectrum.length; i++) {
			sketch.fill(i, 120, 120);
			let amp = spectrum[i];
			let y = sketch.map(amp, 0, 256, sketch.height, 0);
			sketch.rect(i * space_between_lines, y, space_between_lines, sketch.height - y);
		}
		sketch.pop();
	};
}