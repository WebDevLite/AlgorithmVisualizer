import Component from './helpers/Component';
import VisualizerControls from './VisualiserControls';
import { getRandomNumber, scaleValue } from './helpers/helperFunctions';

export default class extends Component {
    constructor(hookId) {
        super(hookId);
        this.list = this.createRootEl('ul', 'visualizer__list', [{name: 'id', value: 'visualizer-list'}]);
        this.indexesList = this.createRootEl('ul', 'visualizer__indexes', [{name: 'id', value: 'visualizer-indexes'}]);
        this.array = [];
        this.liArray = [];
        this.form = document.getElementById('visualizer-inputs-form');
        this.init();
    }

    setArray(value) {
        this.array = value;
    }

    init() {
        const size = this.form.querySelector('#array-size').value;
        const layout = this.form.querySelector('#array-layout').value;
        this.populate(+size);
        this.render();
    }

    populate(len) {
        let size;
        if (!len) {
            size = this.form.querySelector('#array-size').value;
        } else {
            size = len;
        }
        this.array = [];
        this.liArray = [];
        for (let i = 0; i < size; i++) {
            this.array.push(getRandomNumber(1, 999));
        }
    }

    renderArrayItems(parent) {
        this.array.forEach((item, idx) => {
            const li = this.createElement('li', 'visualizer__item');
            li.style.height = `${scaleValue(item, [1, 999], [1, 100])}%`
            const container = this.createElement('div', 'visualizer__item-container');
            const liNumber = this.createElement('p');
            liNumber.textContent = item;
            container.appendChild(liNumber);
            li.appendChild(container);
            this.liArray.push(li);
            parent.appendChild(li);
        })
    }

    renderArrayIndexes(parent) {
        for (let i = 0; i < this.array.length; i++) {
            const li = this.createElement('li', 'visualizer__index');
            li.innerHTML = `<h5>${i}</h5>`;
            parent.appendChild(li);
        }
    }


    render() {
        this.clearRootEl(this.list, '.visualizer__item');
        this.clearRootEl(this.indexesList, '.visualizer__index');
        this.renderArrayItems(this.list);
        this.renderArrayIndexes(this.indexesList);
    }
}