import * as model from './model.js';
import iconsUrl from '../img/icons.svg?url';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
console.log(iconsUrl);

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Gaurd clause
    if (!id) return;

    // 0) Update rusutl view to mark selected search result.
    resultView.update(model.getSearchResultsPage());

    // Update bookmarkView to mark the current bookmark with active class.
    bookmarkView.update(model.state.bookMarks);

    // 1) Render the spinner
    recipeView.renderSpinner();

    // 2) Load recipe
    await model.loadRecipe(id);

    const { recipe } = model.state;

    // 3) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    // temporary Error
    console.log('From controller.js=>💥 ', err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Render the spinner
    resultView.renderSpinner();

    // 2) Get search qurey
    const query = searchView.getQuery();
    if (!query) return;

    // 3) Load search results
    await model.loadSearchResult(query);

    // 4) Check if recepie Array [] is empty
    if (model.state.search.results.length === 0)
      return resultView.renderError();

    // 5)
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    // 6) Render initial pagination button
    paginationView.render(model.state.search);

    // 7) Bind Controler as a Pagination
    paginationView.addHandlerPaginClick(controlPagination);

    console.log(model.state);
  } catch (err) {
    // TEMP
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  paginationView.renderSpinner();

  // 2) Render new search result
  resultView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination button.
  paginationView.render(model.state.search);
};

const contorlServings = function (newServings) {
  model.updateServing(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  if (model.state.recipe.bookmarked) {
    model.removeBookMark(model.state.recipe);
  } else {
    model.addBookMark(model.state.recipe);
  }
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();
    // Close form window
    setTimeout(() => {
      addRecipeView.closeModalWindow();
    }, MODAL_CLOSE_SEC * 1000);

    // window.location.hash = model.state.recipe.id;
    history.pushState(
      { id: model.state.recipe.id },
      '',
      `#${model.state.recipe.id}`,
    );
    bookmarkView.render(model.state.bookMarks);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message + '💥');
  }
};

// Publisher-subscribe pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUpdatings(contorlServings);
  recipeView.addHandlerBookMark(controlAddBookMark);
  // this as when init the programe display bookmarks from localstorage
  bookmarkView.render(model.state.bookMarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

// if (import.meta.hot) {
//   import.meta.hot.accept();
// }

// if (import.meta.hot) {
//   import.meta.hot.on('vite:beforeUpdate', () => {
//     console.clear();
//   });
//   console.log(import.meta.hot);
//   import.meta.hot.accept();
// }
