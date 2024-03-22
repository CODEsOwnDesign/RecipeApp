import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import instructionRouter from './instructionService.js';
import recipeRouter from './recipeService.js';

dotenv.config();

const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./'));

app.get('/', (req, res) => {
	const index = new URL('./index.html', import.meta.url);
	res.sendFile(
		path.resolve(
			index.pathname.startsWith('/')
				? index.pathname.slice(1)
				: index.pathname
		)
	);
	const style = new URL('./style.css', import.meta.url);
	res.sendFile(
		path.resolve(
			style.pathname.startsWith('/')
				? style.pathname.slice(1)
				: style.pathname
		)
	);
});

app.post('/recipe', (req, res) => {
	const dish = req.body.dish;
	recipeRouter(dish, apiKey)
		.then((data) => {
			res.json(data.results);
		})
		.catch((error) => {
			console.error('Error fetching recipes:', error);
			res.status(500).json({ error: 'Error fetching recipes' });
		});
});

app.post('/instructions', (req, res) => {
	const recipeId = req.body.recipeId;
	instructionRouter(recipeId, apiKey)
		.then((data) => {
			res.json(data[0].steps);
		})
		.catch((error) => {
			console.error('Error fetching instructions:', error);
			res.status(500).json({ error: 'Error fetching instructions' });
		});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
