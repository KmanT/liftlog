import { writable } from "svelte/store";

export const user = writable({});
export const cookiesAgreed = writable(false);
export const loggedIn = writable(false);