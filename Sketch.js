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
        p.createCanvas(p.windowWidth * (3 / 4), p.windowHeight * (3 / 4), 100);
        this.player.setup(p);
        this.player.fourier = new p5.FFT();
    }

    draw(p) {
        this.player.draw(p);
        this.player.drawSelectedVisualization(p);
    }

    mouseClicked(p) {
        // Nothing so far...
    }

    resolve() {
        return (p) => {
            p.preload = () => this.preload(p);
            p.setup = () => this.setup(p);
            p.draw = () => this.draw(p);
            p.mouseClicked = () => this.mouseClicked(p);
        }
    }
}