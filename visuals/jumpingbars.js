//draw the waveform to the screen
function JumpingBars() {
	//vis name
	this.name = "jumpingbars";

	//draw the wave form to the screen
	this.draw = function() {
		push();
		noFill();
		stroke(120, 250, 86);
		strokeWeight(2);

		space_between_lines = width / 256;
		let spectrum = fourier.analyze();
		for (let i = 0; i < spectrum.length; i++) {
		  fill(i, 120, 120);
		  let amp = spectrum[i];
		  let y = map(amp, 0, 256, height, 0);
		  rect(i * space_between_lines, y, space_between_lines, height - y);
		}
		pop();
	};
}