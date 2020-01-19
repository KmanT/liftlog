export function cookiesToJson(str) {
	str = str.split(", ");
	var result = {};
	for (var i = 0; i < str.length; i++) {
		var cur = str[i].split("=");
		result[cur[0]] = cur[1];
	}
	return result;
}

export function createCookieExp(date) {
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	return new Date(year, month + 1, day);
}