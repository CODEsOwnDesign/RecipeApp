const API_KEY = '5e66192b4b3b47e58cfc93012be96639';

// Function to fetch recipes based on user input
function getRecipes() {
	var dish = document.getElementById('dish-input').value;
	var url = `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&apiKey=${API_KEY}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			var recipes = data.results;
			var ingredientsList = document.getElementById('ingredients-list');
			ingredientsList.innerHTML = '';

			recipes.forEach((recipe) => {
				var ingredient = createIngredient(recipe);
				ingredientsList.appendChild(ingredient);
			});
		});
}

// Function to create an ingredient element
function createIngredient(recipe) {
	var ingredient = document.createElement('div');
	ingredient.className = 'ingredient';

	var radio = document.createElement('input');
	radio.type = 'radio';
	radio.value = recipe.id;
	radio.name = 'recipe';
	ingredient.appendChild(radio);

	var label = document.createElement('label');
	label.className = 'recipe-title';
	label.textContent = recipe.title;
	ingredient.appendChild(label);
	ingredient.appendChild(document.createElement('br'));

	var image = createRecipeImage(recipe);
	ingredient.appendChild(image);

	return ingredient;
}

// Function to create a recipe image element
function createRecipeImage(recipe) {
	var image = document.createElement('img');
	image.addEventListener('click', selectRecipe);
	image.className = 'recipe-image';
	image.src = recipe.image;

	return image;
}

// Function to fetch instructions for the selected recipe
function getInstructions() {
	var selectedRecipeId = getSelectedRecipeId();
	var url = `https://api.spoonacular.com/recipes/${selectedRecipeId}/analyzedInstructions?apiKey=${API_KEY}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			var instructions = data[0].steps;
			var instructionsList = document.getElementById('instructions');
			instructionsList.innerHTML = '';

			instructions.forEach((step) => {
				var listItem = createInstructionStep(step);
				instructionsList.appendChild(listItem);
			});
		});
}

// Event listeners
document
	.getElementById('get-recipes-btn')
	.addEventListener('click', getRecipes);
document
	.getElementById('get-instructions-btn')
	.addEventListener('click', getInstructions);

// Helper functions

// Function to select a recipe when its image is clicked
function selectRecipe() {
	var radio = this.parentNode.querySelector('input[type="radio"]');
	radio.checked = true;
}

// Function to get the ID of the selected recipe
function getSelectedRecipeId() {
	return document.querySelector('input[type="radio"]:checked').value;
}

// Function to create an instruction step list item
function createInstructionStep(step) {
	var listItem = document.createElement('li');
	listItem.className = 'instruction-step';
	listItem.textContent = step.step;

	return listItem;
}
