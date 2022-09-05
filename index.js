import { Player } from "./Player.js";


// visualizations.add(new WavePattern());
// visualizations.add(new Needles());
// visualizations.add(new JumpingBars());
// visualizations.add(new Pulse());

const player = new Player();

player.mount('#player');

player.run();