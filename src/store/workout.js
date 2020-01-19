import { readable, writable } from "svelte/store";

//export const days = writable([]);
export const exercises = writable([]);
// export const selectedDay = writable(() => {
// 	let newDate = new Date();
// 	newDate.setHours(0, 0, 0, 0);
// 	return newDate.toISOString();
// });

let newDate = new Date();
newDate.setHours(0, 0, 0, 0);
newDate = newDate.toISOString();
newDate = newDate.substring(0,10) + "T00:00:00Z";

export const selectedDay = writable(newDate);
export const today = readable(newDate);