export class Spectrum
{
	/**
	 * Constructor
	 */
	constructor() {
		this.name = "spectrum";
	}

	/**
	 * Draw this visualization
	 * @param {Object} sketch
	 */
	draw(sketch, fourier){
		sketch.push();
		sketch.noStroke();

		const spectrum = fourier.analyze();

		for (let i = 0; i<spectrum.length; i++) {
			//fade the colour of the bin from green to red
			let g = sketch.map(spectrum[i], 0, 255, 255, 0);
			sketch.fill(spectrum[i], g, 0);

			//draw each bin as a rectangle from the left of the screen
			//across
			let y = sketch.map(i, 0, spectrum.length, 0, sketch.height);
			let w = sketch.map(spectrum[i], 0, 255, 0, sketch.width);
			sketch.rect(0, y, w, sketch.height/spectrum.length);
		}

		sketch.pop();
	}
}
