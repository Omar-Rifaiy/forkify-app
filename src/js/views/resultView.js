import View from './View.js';
import previewView from './previewView.js';

import iconsUrl from '../../img/icons.svg?url';
class ResultView extends View {
  _parentElement = document.querySelector(`.results`);
  _errorMessage = 'No Recipe Found for Your query, Please try again :(';
  _message = '';

  // Generate that whole markup
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
