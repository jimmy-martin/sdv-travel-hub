const topDestinationsModule = {
	isInitialized: false,
	container: document.getElementById("top-destinations"),

	async fetch() {
		const res = await fetch("http://localhost:3000/stats/top-destinations");
		const data = await res.json();
		return data.data;
	},

	render(list) {
		this.container.innerHTML = list
			.map(
				(item) => `
        <div>
          <strong>${item.name}</strong> – ${item.count} offres
        </div>
      `,
			)
			.join("");
	},

	async init() {
		if (topDestinationsModule.isInitialized) return;
		topDestinationsModule.isInitialized = true;
		console.log("Top destinations module initialized");

		const data = await this.fetch();
		this.render(data);
	},
};

export default topDestinationsModule;
