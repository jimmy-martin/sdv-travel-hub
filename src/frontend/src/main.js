// async function loadOffers(from = "PAR", to = "TYO", limit = 5, q = "") {
// 	const query = new URLSearchParams({ from, to, limit, q }).toString();
// 	const res = await fetch(`http://localhost:3000/offers?${query}`);
// 	const data = await res.json();
// 	const container = document.getElementById("offers");
// 	container.innerHTML = data.data
// 		.map(
// 			(o) => `
//     <div style="border:1px solid #ccc; margin:5px; padding:5px;">
//       <strong>${o.provider}</strong> – ${o.price} ${o.currency} <br/>
//       ${o.legs?.[0]?.dep} → ${o.legs?.[0]?.arr}
//       <button onclick="loadOfferDetails('${o._id}')">Détail</button>
//     </div>
//   `,
// 		)
// 		.join("");
// }

import logsModule from "./modules/logs";
import offersModule from "./modules/offers";

const main = {
	isInitialized: false,
	async init() {
		if (main.isInitialized) return;
		await logsModule.init();
		await offersModule.init();
		main.isInitialized = true;
		console.log("Main module and all modules initialized");
	},
};

document.addEventListener("DOMContentLoaded", async () => {
	await main.init();
});
