export class Visualizer
{
	/**
	 * Constructor
	 */
	constructor () {
		this.current = 0;
		this.visualizations = [];
		this.selectedVisualization = null;
	}

	draw(p, parent) {
        const visualizer = p.createDiv();
        visualizer.class('visualizer').parent(parent);

        const canvas = p.createCanvas(visualizer.elt.clientWidth, visualizer.elt.clientHeight - 70);
        canvas.class('canvas').parent(visualizer);

		const settings = p.createDiv();
        settings.class('settings').parent(parent);


        const header = p.createElement('h2')
        header.class('header ml-20').parent(settings);
        header.elt.textContent = 'Visualizations';

        const list = p.createElement('ul');
        list.class('tracks ml-16').parent(settings);
        this.visualizations.forEach(visualization => {
			visualization.addToUi(p, list);
        });

        if (this.getCurrent()) {
            this.getCurrent().activate();
        }
    }

	/**
	 * Add a new visualization
	 * @param {Object} visualization
	 */
	add(visualization) {
		visualization.setPosition(this.visualizations.length);
        this.visualizations.push(visualization);
        visualization.whenClicked(() => {
            this.choose(visualization);
        });

		// // if this.selectedVisualization is null set the new visualization
		// // as the current visualiation
		// if(this.selectedVisualization == null){
		// 	this.selectVisualization(visualization.name);
		// }
	};

	/**
	 * Select a visualisation using it name property
	 * @param {string} visName
	 */
	selectVisualization(visName){
		for (var i = 0; i < this.visualizations.length; i++) {
			if (visName == this.visualizations[i].name) {
				this.selectedVisualization = this.visualizations[i];
			}
		}
	};

    getCurrent() {
        return this.visualizations[this.current] || null;
    }

    next() {
        let next = this.current + 1;

        next = next === this.visualizations.length ? 0 : next;

        return this.visualizations[next];
    }

    previous() {
        let previous = this.current - 1;

        previous = previous === -1 ? this.visualizations.length - 1 : previous;

        return this.visualizations[previous];
    }

	choose(visualiation) {
		this.getCurrent().deactivate();
        this.current = visualiation.getPosition();
        this.getCurrent().activate();
    }
}
