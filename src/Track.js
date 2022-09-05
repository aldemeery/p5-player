export class Track
{
    constructor(name, path) {
        this.playlistPosition = null;
        this.name = name;
        this.path = path;
        this.soundFile = new p5.SoundFile(path);
        this.domElement = null;
        this.whenClickedHandler = () => {};
    }

    draw(p, parent) {
        this.domElement = p.createElement('li')
        this.domElement.class('track').parent(parent);

        const name = p.createElement('span');
        name.class('track-name').parent(this.domElement);
        name.elt.innerHTML = this.getName();

        this.domElement.elt.addEventListener('click', this.whenClickedHandler);
    }

    setPlaylistPosition(position) {
        this.playlistPosition = position;
    }

    getPlaylistPosition() {
        return this.playlistPosition;
    }

    getName() {
        return this.name;
    }

    getDuration() {
        return this.soundFile.duration();
    }

    getDurationString() {
        const duration = this.getDuration();
        // const date = new Date(duration * 1000).toISOString();

        // return date;
        // return duration >= 3600 ? date.substring(11, 16) : date.substring(14, 19);
        return duration;
    }

    setVolume(volume) {
        this.soundFile.setVolume(volume / 50.0);
    }

    whenEnded(handler) {
        this.soundFile.onended(handler);
    }

    whenClicked(handler) {
        this.whenClickedHandler = handler;
    }

    activate() {
        this.domElement.addClass('active-track');
    }

    deactivate() {
        this.domElement.removeClass('active-track');
    }

    play() {
        this.soundFile.play();
        this.activate();
    }

    pause() {
        this.soundFile.pause();
    }

    stop() {
        this.soundFile.stop();
        this.deactivate();
    }

    isPlaying() {
        return this.soundFile.isPlaying();
    }

    isLoaded() {
        return this.soundFile.isLoaded();
    }
}