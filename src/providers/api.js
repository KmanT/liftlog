const url =
	"https://cors-anywhere.herokuapp.com/https://turskek-workout-app.herokuapp.com/api/";

export async function signup(email, password, username) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	};

	const body = {
		username,
		email,
		password
	};

	const response = await fetch(`${url}register`, {
		method: "POST",
		headers,
		body: JSON.stringify(body)
	});
	const user = await response.json();
	return user;
}

export async function login(email, password) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	};

	const body = {
		email,
		password
	};

	const response = await fetch(`${url}login`, {
		method: "POST",
		headers,
		body: JSON.stringify(body)
	});
	const user = await response.json();
	return user;
}
/*
	TODO: Update Query to get the first five results after a given day
*/
export async function getUserDays(token, id) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const response = await fetch(`${url}auth/user/${id}/dates/`, {
		method: "GET",
		headers
	});
	const days = await response.json();

	return days;
}

export async function getDayExercises(token, id, date) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const response = await fetch(`${url}auth/user/${id}/exercise/${date}`, {
		method: "GET",
		headers
	});
	const exercises = await response.json();

	return exercises;
}

export async function addWeightedExercise(
	token,
	id,
	date,
	name,
	sets,
	reps,
	weight,
	unit
) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const body = {
		user_id: id,
		date,
		name,
		sets,
		reps,
		weight,
		unit
	};

	console.log(JSON.stringify(body));

	const response = await fetch(`${url}auth/exercise`, {
		method: "POST",
		headers,
		body: JSON.stringify(body)
	});
	const exercise = await response.json();
	console.log(await exercise);
	return exercise;
}

export async function addTimedExercise(token, id, date, name, time) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const body = {
		user_id: id,
		date,
		name,
		time
	};

	const response = await fetch(`${url}auth/exercise`, {
		method: "POST",
		headers,
		body: JSON.stringify(body)
	});
	const exercise = await response.json();
	console.log(await exercise);

	return exercise;
}

export async function addExercise(token, exercise) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const body = exercise;

	const response = await fetch(`${url}auth/exercise`, {
		method: "POST",
		headers,
		body: JSON.stringify(body)
	});
	const newExercise = await response.json();
	console.log(await newExercise);

	return newExercise;
}

export async function editExercise(token, exercise) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const body = exercise;

	const response = await fetch(`${url}auth/exercise/${exercise.id}`, {
		method: "PUT",
		headers,
		body: JSON.stringify(body)
	});
	const editedExercise = await response.json();
	return editedExercise;
}

export async function deleteExercise(token, exid) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-access-token": token,
		"Access-Control-Allow-Origin": "*"
	};

	const response = await fetch(`${url}auth/exercise/${exid}`, {
		method: "DELETE",
		headers
	});

	const deleted = await response.json();
	return deleted;
}
