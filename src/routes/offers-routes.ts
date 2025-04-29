import { Hono } from "hono";
import {
	type CreateOfferParams,
	createOffer,
	getOffer,
	getOffers,
} from "../services/offers-service.js";

const routes = new Hono();

routes.get("/", async (c) => {
	const { from, to, limit, q } = c.req.query();

	const offers = await getOffers({
		from,
		to,
		limit: limit ? Number.parseInt(limit) : undefined,
		searchTerm: q,
	});

	return c.json({ data: offers });
});

routes.get("/:id", async (c) => {
	const { id } = c.req.param();

	const offer = await getOffer(id);

	return c.json({ data: offer });
});

routes.post("/", async (c) => {
	const params: CreateOfferParams = await c.req.json();
	const offer = await createOffer(params);

	return c.json({ data: offer }, 201);
});

export default routes;
