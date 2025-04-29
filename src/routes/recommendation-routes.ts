import { Hono } from "hono";
import { getRecommendations } from "../services/recommendation-service.js";

const routes = new Hono();

routes.get("/", async (c) => {
	const { city, k } = c.req.query();

	const recommendations = await getRecommendations(
		city,
		k ? Number(k) : undefined,
	);

	return c.json({ data: recommendations });
});

export default routes;
