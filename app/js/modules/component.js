export default class Component {
	constructor(arg) {
		this.arg = arg;
	}

	init() {
		console.log(this.arg);
		return this.arg;
	}
}