import { Controls } from "./Controls.js";
import { PlayList } from "./PlayList.js";
import { Sketch } from "./Sketch.js";
import { Track } from "./Track.js";
import { Visualizer } from "./Visualizer.js";

export class Player
{
    constructor({ visualizations }) {
        this.mounted = false;
        this.visualizations = visualizations;
        this.p5 = null;
        this.fourier = null;
        this.volume = null;
        this.controls = new Controls();
        this.playList = new PlayList(this.controls);
        this.visualizer = new Visualizer();
    }

    mount(id) {
        this.p5 = new p5(new Sketch(this).resolve(), document.querySelector(id));

        this.mounted = true;
    }

    preload(p) {
        this.playList.add(new Track('Rocket', 'assets/rocket.wav'));
        this.playList.add(new Track('Stomper Reggae Bit', 'assets/stomper_reggae_bit.mp3'));
    }

    setup(p) {
        const container = p.createDiv();
        container.class('container');

        const view = p.createDiv();
        view.class('view').parent(container);

        this.playList.draw(p, view);
        this.visualizer.draw(p, view);

        this.controls.draw(p, container)
        this.controls.setTrackName(this.playList.getCurrent().getName());

        const settings = p.createDiv();
        settings.class('settings').parent(view);

        this.registerEvents();
    }

    draw(p) {
        p.background('#171b24');
    }

    drawSelectedVisualization(p) {
        this.visualizations.selectedVisualization.draw(p, this.fourier);
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

    run() {
        if (!this.mounted) {
            throw new Error('Cannot run the app before mounting it');
        }

        console.log('Running...');
    }
}
