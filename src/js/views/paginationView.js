import View from './View.js';

import iconsUrl from '../../img/icons.svg?url';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'We could not find that recipe. Please try another one! 💥';
  _message = '';

  _generateMarkup() {
    const pages = Math.ceil(
      this._data.results.length / this._data.resultPerPage,
    );

    const currenPage = this._data.page;

    return `
    ${
      currenPage > 1
        ? `
        <button class="btn--inline pagination__btn--prev" data-goto="${currenPage - 1}">
          <svg class="search__icon">
            <use href="${iconsUrl}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currenPage - 1}</span>
        </button>
      `
        : ''
    }
    
    ${
      pages > 1 && currenPage !== pages
        ? `
        <button class="btn--inline pagination__btn--next" data-goto="${currenPage + 1}">
        <span>Page ${currenPage + 1}</span>
        <svg class="search__icon">
          <use href="${iconsUrl}#icon-arrow-right"></use>
        </svg>
      </button>
      `
        : ''
    }
    `;

    // 1) Page 1 and there are ohter pages
    // 2) Page 1 and there are NO ohter pages
    // 3) IN other pages
    // 4) Last page
  }

  addHandlerPaginClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-goto]');

      if (!btn) return;

      console.log(btn);
      console.log(+btn.dataset.goto);
      handler(+btn.dataset.goto);
    });
  }
}

export default new PaginationView();
