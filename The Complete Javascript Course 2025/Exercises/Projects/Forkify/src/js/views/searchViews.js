class SearchView {
  _parentEl = document.querySelector('.search');

  #clearQuery() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this.#clearQuery();
    return query;
  }

  addEventHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
