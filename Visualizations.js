export class Visualizations
{
	/**
	 * Constructor
	 */
	constructor () {
		//array to store visualisations
		this.visualizations = [];

		//currently selected visualization. set to null until vis loaded in
		this.selectedVisualization = null;
	}

	/**
	 * Add a new visualization
	 * @param {Object} visualization
	 */
	add(visualization) {
		this.visualizations.push(visualization);

		// if this.selectedVisualization is null set the new visualization
		// as the current visualiation
		if(this.selectedVisualization == null){
			this.selectVisualization(visualization.name);
		}
	};

	/**
	 * Select a visualisation using it name property
	 * @param {string} visName
	 */
	selectVisualization(visName){
		for(var i = 0; i < this.visualizations.length; i++){
			if(visName == this.visualizations[i].name){
				this.selectedVisualization = this.visualizations[i];
			}
		}
	};
}
