const offerDetailsModule = {
	isInitialized: false,
	container: document.getElementById("offer-details"),

	async fetch(id) {
		const res = await fetch(`http://localhost:3000/offers/${id}`);
		const data = await res.json();
		return data.data;
	},

	render(offer) {
		this.container.innerHTML = `
            <h2>${offer.provider} – ${offer.price} ${offer.currency}</h2>
            <p>🛫 ${offer.from} → ${offer.to}</p>
            <p>📅 ${offer.departDate} → ${offer.returnDate}</p>
            <p>🏨 Hotel: ${offer.hotel}</p>
            <p>🎢 ${offer.activity.title} – ${offer.activity.price} ${offer.currency}</p>
            <p>🔗 ${offer.relatedOffers.map((offer) => `<a href="/offer-details?id=${offer._id}">${offer.provider} – ${offer.price} ${offer.currency}</a>`).join("\n")}</p>
        `;
	},

	async init() {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get("id");
		if (!id) {
			this.container.innerHTML = "<p>Offre introuvable (id manquant)</p>";
			return;
		}

		const offer = await this.fetch(id);
		this.render(offer);
	},
};

export default offerDetailsModule;
