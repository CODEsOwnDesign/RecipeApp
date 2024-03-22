import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config();

const instructionRouter = express.Router();

instructionRouter.get('/instructions/:recipeId', async (req, res) => {
	const { recipeId } = req.params;
	const apiKey = process.env.API_KEY;

	try {
		const response = await fetch(
			`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		res.json(data[0].steps);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'An error occurred while fetching the instructions.',
		});
	}
});

export default instructionRouter;
