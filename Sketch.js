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
        this.player.setup(p);
    }

    draw(p) {
        this.player.draw(p);
    }

    resolve() {
        return (p) => {
            p.preload = () => this.preload(p);
            p.setup = () => this.setup(p);
            p.draw = () => this.draw(p);
        }
    }
}