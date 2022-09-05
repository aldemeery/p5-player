import { Controls } from "./Controls.js";
import { PlayList } from "./PlayList.js";
import { Sketch } from "./Sketch.js";
import { Track } from "./Track.js";
import { Visualizer } from "./Visualizer.js";
import { Pulse } from "./visuals/Pulse.js";
import { JumpingBars } from "./visuals/JumpingBars.js";
import { Spectrum } from "./visuals/Spectrum.js";
import { WavePattern } from "./visuals/WavePattern.js";
import { Particles } from "./visuals/Particles.js";
import { PeakDetect } from "./visuals/PeakDetect.js";
import { CorrelationCircle } from "./visuals/CorrelationCircle.js";
import { Simple } from "./visuals/Simple.js";

export class Player
{
    constructor() {
        this.mounted = false;
        this.p5 = null;
        this.fourier = null;
        this.visualizer = new Visualizer();
        this.controls = new Controls();
        this.playList = new PlayList(this.controls);
    }

    mount(id) {
        this.p5 = new p5(new Sketch(this).resolve(), document.querySelector(id));
    }

    preload(p) {
        this.playList.add(new Track('Stomper Reggae Bit', 'assets/audio/stomper_reggae_bit.mp3'));
        this.playList.add(new Track('Bicycle', 'assets/audio/bicycle.mp3'));
        this.playList.add(new Track('Fluffing a Duck', 'assets/audio/fluffing_a_duck.mp3'));
        this.playList.add(new Track('Happy Clappy', 'assets/audio/happy_clappy.mp3'));
        this.playList.add(new Track('La Baguette', 'assets/audio/la_baguette.mp3'));
        this.playList.add(new Track('Powerful Trap', 'assets/audio/powerful_trap.mp3'));
        this.playList.add(new Track('Superepic', 'assets/audio/superepic.mp3'));
        this.playList.add(new Track('Rocket', 'assets/audio/rocket.wav'));
    }

    setup(p) {
        this.fourier = new p5.FFT();

        const container = p.createDiv();
        container.class('container');

        const view = p.createDiv();
        view.class('view').parent(container);

        this.registerVisualizations();
        this.setupVisualizations(p, this.fourier);

        this.playList.draw(p, view);
        this.visualizer.draw(p, view);
        this.controls.draw(p, container)
        this.controls.setTrackName(this.playList.getCurrent().getName());

        this.registerEvents();
    }

    registerVisualizations() {
        this.visualizer.add(new JumpingBars());
        this.visualizer.add(new Spectrum());
        this.visualizer.add(new WavePattern());
        this.visualizer.add(new Pulse());
        this.visualizer.add(new Particles());
        this.visualizer.add(new PeakDetect());
        this.visualizer.add(new Simple());
        this.visualizer.add(new CorrelationCircle());
    }

    setupVisualizations(p, fourier) {
        this.visualizer.visualizations.forEach(visualization => {
            visualization.setup(p, fourier);
        });
    }

    draw(p) {
        p.background('#171b24');
        this.visualizer.getCurrent().draw(p, this.fourier);
    }

    registerEvents() {
        this.registerPlayButtonEvents();
        this.registerPauseButtonEvents();
        this.registerNextButtonEvents();
        this.registerPreviousButtonEvents();
        this.registerVolumeSliderEvents();
    }

    registerVolumeSliderEvents() {
        this.controls.volumeSlider.elt.addEventListener('input', (e) => {
            this.playList.getCurrent().setVolume(this.controls.volumeSlider.value());
        });
    }

    registerPreviousButtonEvents() {
        this.controls.previousButton.mousePressed(() => {
            this.playList.play(this.playList.previous());
        });
    }

    registerNextButtonEvents() {
        this.controls.nextButton.mousePressed(() => {
            this.playList.play(this.playList.next());
        });
    }

    registerPauseButtonEvents() {
        this.controls.pauseButton.mousePressed(() => {
            this.playList.getCurrent().pause();
            this.controls.setPaused();
        });
    }

    registerPlayButtonEvents() {
        this.controls.playButton.mousePressed(() => {
            this.playList.getCurrent().play();
            this.controls.setPlaying();
        });
    }
}
