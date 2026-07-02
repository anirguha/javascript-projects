import Views from './Views.js';
import icons from 'url:../../img/icons.svg';
import * as model from '../model.js';

class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');

  createHTML() {
    const currentPage = model.state.search.page;
    const numPages = Math.ceil(
      model.state.search.recipes.length / model.state.search.resultsPerPage
    );

    if (numPages <= 1) {
      // No button
      return '';
    }
    if (currentPage === 1 && numPages > 1) {
      // Only right button
      return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }
    if (currentPage === numPages && numPages > 1) {
      // Only left button
      return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    }
    if (currentPage > 1 && currentPage < numPages) {
      // Left and Right buttons
      return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
          `;
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      if (!Number.isFinite(goToPage)) return;

      handler(goToPage);
    });
  }
}

export default new PaginationView();
