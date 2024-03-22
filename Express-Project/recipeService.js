import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config();

const recipeRouter = express.Router();

recipeRouter.get('/recipes/:dish', async (req, res) => {
	const { dish } = req.params;
	const apiKey = process.env.API_KEY;

	try {
		const response = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?query=${dish}&apiKey=${apiKey}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		res.json(data.results);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'An error occurred while fetching the recipes.',
		});
	}
});

export default recipeRouter;
