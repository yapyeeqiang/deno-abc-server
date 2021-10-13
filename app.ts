import { Application, Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import {
	getAllUsers,
	getUser,
	createUser,
	deleteUser,
} from './controllers/userController.ts';

const app = new Application();

// static files
app.static('/', './public');

// routes
app.get('/', async (ctx: Context) => {
	await ctx.file('./public/index.html');
});

app
	.get('/users', getAllUsers)
	.get('/user/:id', getUser)
	.post('/users', createUser)
	.delete('/user/:id', deleteUser);

// listen to port
app.start({ port: 3000 });
