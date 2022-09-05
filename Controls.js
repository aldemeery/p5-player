export class Controls
{
    constructor() {
        this.trackName = null;
        this.previousButton = null;
        this.nextButton = null;
        this.playButton = null;
        this.pauseButton = null;
        this.volumeSlider = null;
        this.initialized = false;
        this.isPlaying = false;
    }

    setTrackName(trackName) {
        if (!this.isInitialized()) {
            throw new Error('Controls must be initialized first');
        }

        this.trackName.elt.textContent = trackName;
    }

    setPlaying() {
        this.isPlaying = true;
        this.pauseButton.elt.style.display = 'block';
        this.playButton.elt.style.display = 'none';
    }

    setPaused() {
        this.isPlaying = false;
        this.pauseButton.elt.style.display = 'none';
        this.playButton.elt.style.display = 'block';
    }

    draw(p, parent) {
        const control = p.createDiv();
        control.class('control').parent(parent);

        const info = p.createDiv();
        info.class('info').parent(control);

        this.trackName = p.createP('');
        this.trackName.class('title').parent(info);

        const buttons = p.createDiv();
        buttons.class('buttons').parent(control);

        this.previousButton = p.createElement('i', 'fast_rewind');
        this.previousButton.class('material-icons button').parent(buttons);

        this.playButton = p.createElement('i', 'play_arrow');
        this.playButton.class('material-icons button').parent(buttons);

        this. pauseButton = p.createElement('i', 'pause');
        this.pauseButton.style('display', 'none');
        this.pauseButton.class('material-icons button').parent(buttons);

        this.nextButton = p.createElement('i', 'fast_forward');
        this.nextButton.class('material-icons button').parent(buttons);

        const sound = p.createDiv();
        sound.class('sound').parent(control);

        const volumeIcon = p.createElement('i', 'volume_up');
        volumeIcon.class('material-icons volume-icon').parent(sound);

        this.volumeSlider = p.createSlider(0, 100, 50, 1);
        this.volumeSlider.class('volume').parent(sound);

        this.initialized = true;
    }

    isInitialized() {
        return this.initialized;
    }
}