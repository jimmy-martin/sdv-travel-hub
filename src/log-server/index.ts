import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getNewOffersLogs, subscribeToOffers } from "./redis.js";

const app = new Hono();

app.use(cors());

app.get("/logs/offers-new", (c) => {
	return c.json({ logs: getNewOffersLogs() });
});

subscribeToOffers().then(() => {
	console.log('✅ Subscribed to Redis channel "offers:new"');
});

serve({ fetch: app.fetch, port: 4000 });
