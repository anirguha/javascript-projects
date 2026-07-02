import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import { MODAL_CLOSE_SEC } from './config.js';

import { renderRecipe } from './views/recipeViews.js';
import searchView from './views/searchViews.js';
import resultsView from './views/searchResultsView.js';
import paginationViews from './views/paginationViews.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) module.hot.accept();

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    if (model.state.search.recipes.length)
      resultsView.update(model.getSearchResultsByPage());

    if (model.state.bookMarks.length)
      bookmarksView.update(model.state.bookMarks);

    await model.getRecipe(id);
    renderRecipe.render(model.state.recipe);
  } catch (err) {
    renderRecipe.renderErr(err.message);
  }
};

const controlSearchRecipe = async function () {
  try {
    const query = searchView.getQuery();
    await model.searchRecipe(query);
    resultsView.render(model.getSearchResultsByPage());
    paginationViews.render(model.state.search);
  } catch (err) {
    document.querySelector('.results').innerHTML = '';
    renderRecipe.renderErr(err.message);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsByPage(goToPage));
  paginationViews.render(model.state.search);
};

const controlUpdateServings = function (newServings) {
  model.updateServings(newServings);
  renderRecipe.update(model.state.recipe);
};

const controlAddBookMark = function () {
  model.state.recipe.bookMarked
    ? model.removeBookMark(model.state.recipe.id)
    : model.addBookMark(model.state.recipe);
  renderRecipe.update(model.state.recipe);
  bookmarksView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    renderRecipe.render(model.state.recipe);
    bookmarksView.render(model.state.bookMarks);
    addRecipeView.renderMessage('Recipe was successfully uploaded!');
    bookmarksView.render(model.state.bookMarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
      addRecipeView.resetForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err.message);
    addRecipeView.renderErr(`💥 ${err.message}`);
  }
};

const init = function () {
  model.init();
  bookmarksView.render(model.state.bookMarks);

  renderRecipe.addHandlerRender(controlRecipe);
  renderRecipe.addHandlerUpdateServings(controlUpdateServings);
  renderRecipe.addHandlerAddBookmark(controlAddBookMark);
  searchView.addEventHandler(controlSearchRecipe);
  paginationViews.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
