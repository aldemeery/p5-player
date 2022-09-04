import { Sketch } from "./Sketch.js";

export class Player
{
    constructor({ visualizations }) {
        this.mounted = false;
        this.visualizations = visualizations;
        this.p5 = null;
        this.sound = null;
        this.fourier = null;
        this.playButton = null;
    }

    mount(id) {
        this.p5 = new p5(new Sketch(this).resolve(), document.querySelector(id));

        this.mounted = true;
    }

    preload(p) {
        this.sound = p.loadSound('assets/stomper_reggae_bit.mp3');
        // this.playButton = p.loadImage('assets/play.png');
    }

    setup(p) {
        this.playButton = p.createImg('assets/play.png');
        this.playButton.class('play-btn');
        this.playButton.mousePressed(this.togglePlaying());
        p.background('#171b24');
    }

    draw(p) {
        p.background('#171b24');
        this.drawControlPanel(p);
    }

    drawSelectedVisualization(p) {
        this.visualizations.selectedVisualization.draw(p, this.fourier);
    }

    drawControlPanel(p) {
        p.push();
        p.fill('#283241');
        p.rect(-1, p.height - 69, p.width + 2, 70);
        p.pop();
    }

    togglePlaying() {
        return () => {
            if (this.sound.isPlaying()) {
                this.sound.pause();
                this.playBtn.html = 'Paly';
            } else {
                this.sound.play();
                this.playBtn.html = 'Pause';
            }
        }
    }

    run() {
        if (!this.mounted) {
            throw new Error('Cannot run the app before mounting it');
        }

        console.log('Running...');
    }
}
