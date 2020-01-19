import moment from "moment";

export function formatTime(miliseconds) {
	if (miliseconds >= 3600000) {
		return moment(seconds * 1000).format("h:mm:ss") + "hours";
	} else if (miliseconds <= 60000) {
		return moment(miliseconds * 1000).format("m:ss") + " minutes";
	} else {
		return moment(miliseconds * 1000).format("mm:ss") + " minute";
	}
}

export function formatDay(date) {
	let day = date.substring(0, 10);
	return moment(new Date(day))
		.add(1, "days")
		.format("MMM Do, YYYY");
}

export function timeToSeconds(time) {
	return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

export function secondsToTime(seconds) {
	const timeString = moment(seconds * 1000).format("hh:mm:ss");
	return {
		hours: timeString.substr(0, 1),
		minutes: timeString.substr(3, 4),
		seconds: timeString.substr(6, 7)
	};
}
