import iconsUrl from '../../img/icons.svg?url';

export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data the data to be renderd (e.g. recipe)
   * @param {boolean} [render=true] if false create markup string instead of rendering to the  DOM
   * @returns {string | undefined} Markup string when render is false
   * @this {View} View instance
   *
   * @example
   * instance.render(recipe)
   * @example
   * const markup = view.render(recipe, false);
   *
   * @see _generateMarkup
   * @since 1.0.0
   * @author Omar Rifai
   * @todo Finish the implementation // this if you will continue
   */
  render(data, render = true) {
    this._data = data;

    if (!render) return this._generateMarkup();

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${iconsUrl}#icon-loader"></use>
        </svg>
      </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(data);
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*')); // Static NodeList

    // Get Current DOM
    const curElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update Changed ATTRIBUTES
      if (!curEl.isEqualNode(newEl)) {
        // curEl.replaceWith(newEl.cloneNode(true)); // will overKill the browser
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${iconsUrl}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${iconsUrl}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
