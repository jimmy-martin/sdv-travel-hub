const logsModule = {
	isInitialized: false,
	container: document.getElementById("logs"),

	async init() {
		if (logsModule.isInitialized) return;
		logsModule.isInitialized = true;
		console.log("Logs module initialized");

		const logs = await this.fetch();
		this.render(logs);

		setInterval(this.reloadLogs, 10000);
	},

	async fetch() {
		const res = await fetch("http://localhost:4000/logs/offers-new");
		const data = await res.json();
		return data.logs;
	},

	render(logs) {
		this.container.innerHTML = logs.map(this.getLogTemplate).join("");
	},

	getLogTemplate(log) {
		return `<div><strong>${log.date}</strong> - ${log.message}</div>`;
	},

	async reloadLogs() {
		const logs = await logsModule.fetch();
		logsModule.render(logs);
	},
};

export default logsModule;
