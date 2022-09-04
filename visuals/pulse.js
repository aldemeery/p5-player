//draw the waveform to the screen
function Pulse() {
	//vis name
	this.name = "pulse";

	this.draw = function () {
		samples = fourier.waveform();
		var bufLen = width;

		beginShape();

		var freq = map(mouseX, 0, windowWidth, 1, 440);

		for (var i = 0; i < bufLen; i++){
			var x = map(i, 0, bufLen, 0, width * 2);
			var y = map(samples[i], -1, 1, -height/2, height/2);
			vertex(x, y + height/2);
		}

		endShape();

		osc = new p5.Oscillator(300);
		osc.freq(freq, 0.01);
		var amp = map(mouseY, height, 0, 0, 1);
		osc.amp(amp, 0.01);
	}
}