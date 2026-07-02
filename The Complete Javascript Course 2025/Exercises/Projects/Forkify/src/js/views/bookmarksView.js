import Views from './Views.js';
import previewView from './previewView.js';

class BookmarksView extends Views {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks yet. Try bookmarking a recipe of your choice.:-)';
  _message = '';

  createHTML(data = this._data) {
    // console.log(data);
    return data.map((bookmark) => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
