class searchView {
  _parenElement = document.querySelector(`.search`);

  getQuery() {
    const query = this._parenElement.querySelector('.search__field').value;

    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parenElement.querySelector('.search__field').value = '';
    this._parenElement.querySelector('.search__field').blur();
  }

  addHandlerSearch(handler) {
    this._parenElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
