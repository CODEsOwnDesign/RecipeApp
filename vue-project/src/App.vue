<template>
  <div class="container">
    <div class="header">
      <div class="title">
        <h4>Recipe App</h4>
      </div>
      <div class="input">
        <input type="text" v-model="dish" placeholder="Enter the dish you want" />
        <button @click="getRecipes">Get Ingredients</button>
      </div>
    </div>

    <div class="wrapper">
      <div id="content">
        <div v-for="(recipe, index) in recipes" :key="index" class="recipe-item">
          <input
            type="radio"
            :value="recipe.id"
            v-model="selectedRecipe"
            @change="updateSelectedIngredients"
          />
          <span class="recipe-title">{{ recipe.title }}</span>
          <img
            :src="recipe.image"
            alt="Recipe Image"
            class="recipe-image"
            @click="selectRecipe(recipe.id)"
          />
        </div>
      </div>
      <div class="instruction-container">
        <button @click="getInstructions" class="get-recipe-button">Get Recipe</button>
        <div class="output">
          <ol>
            <li v-for="(step, index) in instructions" :key="index" class="instruction-step">
              {{ step.step }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>
        Developed by:
        <a href="https://github.com/MNUCS2024">Team G1@MNUCS2024</a>
      </p>
    </div>
  </div>
</template>

<script>
const API_KEY = '5e66192b4b3b47e58cfc93012be96639';

export default {
  data() {
    return {
      dish: '',
      recipes: [],
      selectedRecipe: '',
      selectedIngredients: [],
      instructions: [],
      recipe: '',
      recipeImage: ''
    };
  },
  methods: {
    selectRecipe(recipeId) {
      this.selectedRecipe = recipeId;
      this.updateSelectedIngredients();
    },
    getRecipes() {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${this.dish}&apiKey=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.recipes = data.results;
        });
    },
    updateSelectedIngredients() {
      this.selectedIngredients = [this.selectedRecipe];
    },
    getInstructions() {
      fetch(
        `https://api.spoonacular.com/recipes/${this.selectedIngredients[0]}/analyzedInstructions?apiKey=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.instructions = data[0].steps;
        });
    }
  }
};
</script>
