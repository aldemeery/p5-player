export class Visualizer
{
    draw(p, parent) {
        const visualizer = p.createDiv();
        visualizer.class('visualizer').parent(parent);

        const canvas = p.createCanvas(visualizer.elt.clientWidth, visualizer.elt.clientHeight - 70);
        canvas.class('canvas').parent(visualizer);
    }
}