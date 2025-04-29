import { Hono } from "hono";
import { getTopDestinations } from "../services/stats-services.js";

const routes = new Hono();

routes.get("/top-destinations", async (c) => {
	const { limit } = c.req.query();

	const topDestinations = await getTopDestinations(
		limit ? Number.parseInt(limit) : 10,
	);

	return c.json({ data: topDestinations });
});

export default routes;
