import { Histogram } from "prom-client";
import registry from "../registries/registry.js";

const offersCacheHistogram = new Histogram({
	name: "get_offers_duration",
	help: "Duration of offers retrieving in seconds",
	labelNames: ["route"],
	buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
	registers: [registry],
});

const offerCacheHistogram = new Histogram({
	name: "get_offer_duration",
	help: "Duration of offer retrieving in seconds",
	labelNames: ["id"],
	buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
	registers: [registry],
});

export { offersCacheHistogram, offerCacheHistogram };
