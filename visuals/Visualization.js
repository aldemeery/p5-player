export class Visualization
{
    constructor() {
        this.position = null;
        this.domElement = null;
        this.whenClickedHandler = () => {};
    }

    addToUi(p, parent) {
		this.domElement = p.createElement('li')
        this.domElement.class('track').parent(parent);

        const name = p.createElement('span');
        name.class('track-name').parent(this.domElement);
        name.elt.innerHTML = this.getDisplayName();

        this.domElement.elt.addEventListener('click', this.whenClickedHandler);
	}

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }

    getName() {
        return this.name;
    }

    getDisplayName() {
        return this.displayName;
    }

    activate() {
        this.domElement.addClass('active-track');
    }

    deactivate() {
        this.domElement.removeClass('active-track');
    }

    whenClicked(handler) {
        this.whenClickedHandler = handler;
    }
}