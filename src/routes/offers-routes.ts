import { Hono } from "hono";
import {
	offerCacheHistogram,
	offersCacheHistogram,
} from "../metrics/histogram/cache-histogram.js";
import {
	type CreateOfferParams,
	createOffer,
	getOffer,
	getOffers,
} from "../services/offers-service.js";

const routes = new Hono();

routes.get("/", async (c) => {
	const { from, to, limit, q } = c.req.query();
	const start = offersCacheHistogram.startTimer({ route: c.req.path });

	const offers = await getOffers({
		from,
		to,
		limit: limit ? Number.parseInt(limit) : undefined,
		searchTerm: q,
	});

	start();

	return c.json({ data: offers });
});

routes.get("/:id", async (c) => {
	const { id } = c.req.param();

	const start = offerCacheHistogram.startTimer({ id });

	const offer = await getOffer(id);

	if (!offer) {
		return c.json({ error: "Offer not found" }, 404);
	}

	start();

	return c.json({ data: offer });
});

routes.post("/", async (c) => {
	const params: CreateOfferParams = await c.req.json();
	const insertedId = await createOffer(params);

	return c.json({ data: { _id: insertedId, ...params } }, 201);
});

export default routes;
