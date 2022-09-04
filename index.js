import { Player } from "./Player.js";
import { Visualizations } from "./Visualizations.js";
import { Spectrum } from "./visuals/Spectrum.js";

const visualizations = new Visualizations();
visualizations.add(new Spectrum());
// visualizations.add(new WavePattern());
// visualizations.add(new Needles());
// visualizations.add(new JumpingBars());
// visualizations.add(new Pulse());

const player = new Player({
    visualizations,
});

player.mount('#player');

player.run();