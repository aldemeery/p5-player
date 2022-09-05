export class Sketch
{
    /**
     * Constructor.
     * @param {Object} player
     */
    constructor(player) {
        this.player = player;
    }

    preload(p) {
        this.player.preload(p);
    }

    setup(p) {
        this.player.fourier = new p5.FFT();
        this.player.setup(p);
    }

    draw(p) {
        this.player.draw(p);
        this.player.drawSelectedVisualization(p);
    }

    resolve() {
        return (p) => {
            p.preload = () => this.preload(p);
            p.setup = () => this.setup(p);
            p.draw = () => this.draw(p);
        }
    }
}