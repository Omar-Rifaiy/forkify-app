import View from './View.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;) 💥';
  // _message = '';

  _generateMarkup() {
    if (this._data.length) {
      return this._data
        .slice()
        .reverse()
        .map(bookmark => previewView.render(bookmark, false))
        .join('');
    } else {
      return `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>
          No bookmarks yet. Find a nice recipe and bookmark it :)
        </p>
      </div>
      `;
    }
  }

  // addHandlerBookMark(handler) {
  //   this._parentElement.addEventListener('click', function (e) {
  //     const btn = e.currentTarget.closest('.nav__btn--bookmarks');

  //     if (!btn) return;

  //     handler();
  //   });
  // }
}

export default new BookmarkView();

// export { default as lll } from './BookmarkView.js';

/* 
import * as module from './test.js';

فيمكنك الوصول إلى:

module.default
module.age

. Re-export لكل الـnamed exports

عندك:

export * from './User.js';

ده معناه:

أعد تصدير كل الـnamed exports الموجودة في User.js.

مثلاً لو:

// User.js

export const User = {};
export const permissions = {};
export function login() {}

ثم:

// index.js

export * from './User.js';

المستخدم يستطيع:

import { User, permissions, login } from './index.js';


لكن export * لا يعيد تصدير الـdefault

دي من أشهر النقاط اللي لازم تعرفها.

لو:

// User.js

export default User;
export const permissions = {};

وعملت:

export * from './User.js';

فـpermissions هتتعمل لها re-export.

لكن الـdefault مش هيتم إعادة تصديره.

لو عايز تعمل re-export للـdefault:

export { default } from './User.js';





Re-export للـdefault باسم جديد

ودي مهمة جدًا لأنها مرتبطة بسؤالك عن as.

عندك:

// User.js

export default class User {}

في index.js:

export { default as User } from './User.js';

هنا:

default في User.js
        ↓
       as
        ↓
User في index.js

ثم:

import { User } from './models/index.js';




_____________________________________________
أهم 10 أشكال تحفظهم
// 1
export const x = 10;
// 2
const x = 10;
export { x };
// 3
export { x as y };
// 4
export default x;
// 5
export default class User {}
// 6
export default new BookmarkView();
// 7
import { x as y } from './module.js';
// 8
export { x } from './module.js';
// 9
export * from './module.js';
// 10
export { default as X } from './module.js';
 */
