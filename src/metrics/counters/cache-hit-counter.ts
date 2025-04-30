import { Counter } from "prom-client";
import registry from "../registries/registry.js";

const offersCacheHitCounter = new Counter({
	name: "offers_cache_hit",
	help: "Number of times the offers cache was hit",
	registers: [registry],
});

const offerCacheHitCounter = new Counter({
	name: "offer_cache_hit",
	help: "Number of times the offer cache was hit",
	registers: [registry],
});

export { offersCacheHitCounter, offerCacheHitCounter };
