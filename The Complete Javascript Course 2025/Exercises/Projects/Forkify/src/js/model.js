import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookMarks: [],
};

const createRecipeObject = function (data) {
  const { source_url, image_url, cooking_time, ...restRecipe } =
    data.data.recipe;

  return {
    srcUrl: source_url,
    img: image_url,
    cookingTime: cooking_time,
    bookMarked: state.bookMarks.some(
      (bookmark) => bookmark.id === restRecipe.id
    ),
    ...(restRecipe.key && { key: restRecipe.key }),
    ...restRecipe,
  };
};

export const getRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);

    return state.recipe;
  } catch (err) {
    throw err;
  }
};

export const searchRecipe = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);

    const recipes = data.data.recipes;
    state.search.recipes = recipes.map(function (recipe) {
      return {
        publisher: recipe.publisher,
        img: recipe.image_url,
        title: recipe.title,
        id: recipe.id,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.query = query;
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsByPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = start + state.search.resultsPerPage;

  return state.search.recipes.slice(start, end);
};

export const updateServings = function (newServings) {
  const oldServings = state.recipe.servings;

  state.recipe.ingredients.forEach(
    (ing) => (ing.quantity = (ing.quantity * newServings) / oldServings)
  );

  state.recipe.servings = newServings;
};

const persistentStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};

const loadBookMarks = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookMarks = JSON.parse(storage);
};

export const init = function () {
  loadBookMarks();
};

export const addBookMark = function (recipe) {
  recipe.bookMarked = true;
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;

  const alreadyBookMarked = state.bookMarks.some(
    (bookMark) => bookMark.id === recipe.id
  );

  if (!alreadyBookMarked) {
    state.bookMarks.push(recipe);
    persistentStorage();
  }
};

export const removeBookMark = function (id) {
  const index = state.bookMarks.findIndex((bookMark) => bookMark.id === id);
  state.bookMarks.splice(index, 1);
  persistentStorage();
  if (id === state.recipe.id) state.recipe.bookMarked = false;
};

export const uploadRecipe = async function (newRecipe) {
  try {
    if (!newRecipe) throw new Error('Please fill the form to upload recipes');
    const ingredients = Object.entries(newRecipe)
      .filter(([key, value]) => key.startsWith('ingredient') && value !== '')
      .map(([, value], index) => {
        const ingArray = value.replaceAll(' ', '').split(',');

        if (ingArray.length !== 3)
          throw new Error(
            `💥 Invalid format for item ${index + 1}. Please correct the format!`
          );

        const [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description };
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
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const clearStorage = () => localStorage.clear();

// clearStorage();
