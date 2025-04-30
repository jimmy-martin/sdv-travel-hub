import logsModule from "./modules/logs";
import offerDetailsModule from "./modules/offer-details";
import offersModule from "./modules/offers";
import topDestinationsModule from "./modules/top-destinations";
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
