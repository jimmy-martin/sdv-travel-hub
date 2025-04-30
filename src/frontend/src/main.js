async function loadOffers(from = "PAR", to = "TYO", limit = 5, q = "") {
	const query = new URLSearchParams({ from, to, limit, q }).toString();
	const res = await fetch(`http://localhost:3000/offers?${query}`);
	const data = await res.json();
	const container = document.getElementById("offers");
	container.innerHTML = data.data
		.map(
			(o) => `
    <div style="border:1px solid #ccc; margin:5px; padding:5px;">
      <strong>${o.provider}</strong> – ${o.price} ${o.currency} <br/>
      ${o.legs?.[0]?.dep} → ${o.legs?.[0]?.arr}
      <button onclick="loadOfferDetails('${o._id}')">Détail</button>
    </div>
  `,
		)
		.join("");
}

async function loadOfferDetails(id) {
	const res = await fetch(`http://localhost:3000/offers/${id}`);
	const data = await res.json();
	alert(JSON.stringify(data.data, null, 2));
}

async function createOffer(event) {
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
		alert("Offre créée !");
		loadOffers();
	}
}

const logTemplate = (log) => {
	const { date, message } = log;

	const template = `
    <div>
      <strong>${date}</strong> - ${message}
    </div>
  `;

	return template;
};

async function loadLogs() {
	const res = await fetch("http://localhost:4000/logs/offers-new");
	const data = await res.json();
	const logs = data.logs.map(logTemplate).join("");
	document.getElementById("logs").innerHTML = logs;
}

document.getElementById("filter-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const from = e.target.from.value;
	const to = e.target.to.value;
	const limit = e.target.limit.value;
	const q = e.target.q.value;
	loadOffers(from, to, limit, q);
});

document.getElementById("create-form").addEventListener("submit", createOffer);

loadOffers();
loadLogs();

setInterval(loadLogs, 10000);
