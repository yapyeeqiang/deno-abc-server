import { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts';
import { User } from '../models/userModel.ts';
import { v4 } from 'https://deno.land/std@0.107.0/uuid/mod.ts';

let users: User[] = [
	{ id: '1', name: 'User 1', age: 20, isMale: false },
	{ id: '2', name: 'User 2', age: 30, isMale: true },
	{ id: '3', name: 'User 3', age: 10, isMale: false },
];

export function getAllUsers(ctx: Context) {
	return ctx.json(users, 200);
}

export async function getUser(ctx: Context) {
	const { id } = await ctx.params;
	const user = users.find((u: User) => u.id === id);

	if (user) {
		return ctx.json(user, 200);
	}

	return ctx.json(
		{
			error: `no user with the id ${id}`,
		},
		404
	);
}

export async function createUser(ctx: Context) {
	const id = v4.generate();
	const { name, age, isMale } = (await ctx.body) as User;

	const user = {
		id,
		name,
		age,
		isMale,
	};

	users.push(user);

	return ctx.json(user, 201);
}

export async function deleteUser(ctx: Context) {
	const { id } = await ctx.params;
	const user = users.find((u: User) => u.id === id);

	if (user) {
		users = users.filter((u: User) => u.id !== id);
		return ctx.json(user, 200);
	}

	return ctx.json(
		{
			error: `no user with the id ${id}`,
		},
		404
	);
}
