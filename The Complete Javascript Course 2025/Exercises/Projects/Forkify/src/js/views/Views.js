import icons from 'url:../../img/icons.svg';

export default class Views {
  _parentElement = document.querySelector('.recipe');
  _data;

  clear(parentEl) {
    parentEl.innerHTML = '';
  }

  renderSpinner(parentEl = this._parentElement) {
    const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this.clear(parentEl);
    parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderErr(message = 'Something went wrong!', parentEl = this._parentElement) {
    const html = `<div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>`;
    this.clear(parentEl);
    parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(message = '', parentEl = this._parentElement) {
    const html = `<div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>`;
    this.clear(parentEl);
    parentEl.insertAdjacentHTML('afterbegin', html);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErr();

    this._data = data;
    const markup = this.createHTML(data);

    if (!render) return markup;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErr();

    this._data = data;
    const newMarkup = this.createHTML(data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    if (newElements.length !== curElements.length) {
      this.render(data);
      return;
    }

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!curEl) return;

      const changed = !newEl.isEqualNode(curEl);
      if (!changed) return;

      const hasDirectText =
        newEl.firstChild?.nodeType === Node.TEXT_NODE &&
        newEl.childNodes.length === 1 &&
        newEl.firstChild.nodeValue?.trim() !== '';

      if (hasDirectText) curEl.textContent = newEl.textContent;

      Array.from(curEl.attributes).forEach((attr) => {
        if (!newEl.hasAttribute(attr.name)) curEl.removeAttribute(attr.name);
      });

      Array.from(newEl.attributes).forEach((attr) => {
        if (curEl.getAttribute(attr.name) !== attr.value) {
          curEl.setAttribute(attr.name, attr.value);
        }
      });
    });
  }
}
