import Views from './Views.js';
import previewView from './previewView.js';

class ResultsView extends Views {
  _parentElement = document.querySelector('.results');

  createHTML(data = this._data) {
    // console.log(data);
    return data.map((result) => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
