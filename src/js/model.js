import { getJson, sendJson } from './helper.js';
import { RESULTS_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookMarks: [],
};

const API_URL = import.meta.env.VITE_RECIPE__API;
const API_KEY = import.meta.env.VITE_RECIPE__API_KEY;

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  console.log('form createRE', data, recipe);

  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    // bookmarked: isBookmarked,
    bookmarked: state.bookMarks.some(bookmark => bookmark.id === recipe.id),

    ...(recipe.key && { key: recipe.key }),
  };
};
// todo LODING DATA from the api
export const loadRecipe = async function (id) {
  try {
    // 1) Loading the data
    const data = await getJson(`${API_URL}${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);
  } catch (err) {
    console.log('From module.js=>💥');
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJson(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });

    state.search.numPages = Math.ceil(
      data.results / state.search.resultPerPage,
    );
  } catch (err) {
    console.log('From module.js=>💥');
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; // 0
  const end = page * state.search.resultPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

export const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};

export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe);
  console.log(recipe);
  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const removeBookMark = function (recipe) {
  state.bookMarks = state.bookMarks.filter(rec => rec.id !== recipe.id);

  // Mark current recipe as Not bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => {
        return entry[0].startsWith('ingredient') && entry[1] !== '';
      })
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient formate! please use the correct formate :)',
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: +quantity || null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Send Post request
    const data = await sendJson(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    console.log('From module.js=>💥');
    throw err;
  }
};

const init = function () {
  state.bookMarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
};
init();
