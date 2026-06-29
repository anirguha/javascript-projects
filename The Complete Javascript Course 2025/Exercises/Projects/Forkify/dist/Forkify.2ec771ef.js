function e(e){return e&&e.__esModule?e.default:e}var s={};console.log(e(s=import.meta.resolve("eyyUD")));let i=document.querySelector(".recipe"),c=function(c){let n=`<figure class="recipe__fig">
          <img src="${c.img}" alt="${c.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${c.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(s)}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${c.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(s)}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${c.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${e(s)}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${e(s)}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${e(s)}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${e(s)}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

        ${c.ingredients.map(i=>`<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${e(s)}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${i.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${i.unit}</span>
            ${i.description}
          </div>
          </li>`).join("")}

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${c.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${c.srcUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${e(s)}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;i.innerHTML="",i.insertAdjacentHTML("afterbegin",n)};(async function(){try{let e=await fetch("https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e880c");if(!e.ok)throw Error(`${e.message} (${e.status})`);let{source_url:s,image_url:i,cooking_time:c,...n}=(await e.json()).data.recipe;return{srcUrl:s,img:i,cookingTime:c,...n}}catch(e){alert(e)}})().then(e=>c(e));
//# sourceMappingURL=Forkify.2ec771ef.js.map
