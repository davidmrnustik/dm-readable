
export const getDateFromTimeStamp = (timestamp, format) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const date = new Date(timestamp);
	const time = `${date.toTimeString().match(/\d+:\d+/)[0]}`;
	const fullDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

	switch(format) {
		case 'full':
			return `${fullDate}, ${time}`;

		case 'time':
			return time;

		default:
			return fullDate;
	}
}