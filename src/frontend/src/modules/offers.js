import logsModule from "./logs";

const offersModule = {
	isInitialized: false,
	container: document.getElementById("offers"),

	async init() {
		if (offersModule.isInitialized) return;
		offersModule.isInitialized = true;
		console.log("Offers module initialized");

		this.addEventListeners();
	},

	async initDeps() {
		await logsModule.init();
	},

	async fetchAll({ from = "", to = "", limit = "", q = "" }) {
		const query = new URLSearchParams({ from, to, limit, q }).toString();
		const res = await fetch(`http://localhost:3000/offers?${query}`);
		const data = await res.json();
		return data.data;
	},

	async fetchOne(id) {
		const res = await fetch(`http://localhost:3000/offers/${id}`);
		const data = await res.json();
		return data.data;
	},

	render(offers) {
		this.container.innerHTML = offers
			.map(
				(o) => `
                    <div style="border:1px solid #ccc; margin:5px; padding:5px;">
                        <strong>${o.provider}</strong> – ${o.price} ${o.currency} <br/>
                        ${o.legs?.[0]?.dep} → ${o.legs?.[0]?.arr}
                        // <button onclick="loadOfferDetails('${o._id}')">Détail</button>
                        // redirect to 
                    </div>
                `,
			)
			.join("");
	},

	addEventListeners() {
		document
			.getElementById("filter-form")
			.addEventListener("submit", async (e) => await this.filter(e));
		document
			.getElementById("create-form")
			.addEventListener("submit", async (e) => await this.create(e));
	},

	async filter(event) {
		event.preventDefault();
		const from = event.target.from.value;
		const to = event.target.to.value;
		const limit = event.target.limit.value;
		const q = event.target.q.value;
		const offers = await this.fetchAll({ from, to, limit, q });
		this.render(offers);
	},

	async create(event) {
		event.preventDefault();
		const body = {
			from: event.target.from.value,
			to: event.target.to.value,
			departDate: new Date().toISOString(),
			returnDate: new Date(Date.now() + 86400000 * 7).toISOString(),
			provider: event.target.provider.value,
			price: Number(event.target.price.value),
			currency: "EUR",
			legs: [
				{
					flightNum: "AF123",
					dep: event.target.from.value,
					arr: event.target.to.value,
					duration: 180,
				},
			],
			hotel: null,
			activity: null,
		};
		const res = await fetch("http://localhost:3000/offers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		if (res.ok) {
			console.log("Offre créée !");
		}

		await logsModule.reloadLogs();
	},
};

export default offersModule;
