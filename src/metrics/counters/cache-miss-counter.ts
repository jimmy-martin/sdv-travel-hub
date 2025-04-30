import { Counter } from "prom-client";
import registry from "../registries/registry.js";

const offersCacheMissCounter = new Counter({
	name: "offers_cache_miss",
	help: "Number of times the offers cache was missed",
	registers: [registry],
});

const offerCacheMissCounter = new Counter({
	name: "offer_cache_miss",
	help: "Number of times the offer cache was missed",
	registers: [registry],
});

export { offersCacheMissCounter, offerCacheMissCounter };
