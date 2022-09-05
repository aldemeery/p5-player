export class PlayList
{
    constructor(controls) {
        this.controls = controls
        this.current = 0;
        this.tracks = [];
    }

    draw(p, parent) {
        const playList = p.createDiv()
        playList.class('playlist').parent(parent);

        const list = p.createElement('ul');
        list.class('tracks').parent(playList);
        this.tracks.forEach(track => {
            track.draw(p, list);
        });

        if (this.getCurrent()) {
            this.getCurrent().activate();
        }
    }

    add(track) {
        track.setPlaylistPosition(this.tracks.length);
        this.tracks.push(track);
        track.whenClicked(() => {
            this.play(track);
        });
    }

    getCurrent() {
        return this.tracks[this.current] || null;
    }

    next() {
        let next = this.current + 1;

        next = next === this.tracks.length ? 0 : next;

        return this.tracks[next];
    }

    previous() {
        let previous = this.current - 1;

        previous = previous === -1 ? this.tracks.length - 1 : previous;

        return this.tracks[previous];
    }

    play(track) {
        let wasPlaying = this.getCurrent().isPlaying();

        this.controls.setPaused();
        this.getCurrent().stop();
        this.current = track.getPlaylistPosition();
        this.getCurrent().setVolume(this.controls.volumeSlider.value());
        this.getCurrent().activate();
        this.controls.setTrackName(this.getCurrent().getName());

        if (wasPlaying) {
            this.getCurrent().play();
            this.controls.setPlaying();
        }
    }
}