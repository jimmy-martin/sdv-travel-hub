import { serve } from "@hono/node-server";
import { prometheus } from "@hono/prometheus";
import { Hono } from "hono";
import { timing } from "hono/timing";
import registry from "./metrics/registries/registry.js";
import customTimingMiddleware from "./middlewares/custom-timing-middleware.js";
import forceJsonHeadersMiddleware from "./middlewares/response-middleware.js";
import loginRoutes from "./routes/login-routes.js";
import offersRoutes from "./routes/offers-routes.js";
import recommendationRoutes from "./routes/recommendation-routes.js";
import statsRoutes from "./routes/stats-routes.js";

const app = new Hono();

const { printMetrics, registerMetrics } = prometheus({ registry });

app.use(timing());
app.use(customTimingMiddleware);
app.use(forceJsonHeadersMiddleware);
app.use("*", registerMetrics);
app.get("/metrics", printMetrics);

app.route("/offers", offersRoutes);
app.route("/login", loginRoutes);
app.route("/reco", recommendationRoutes);
app.route("/stats", statsRoutes);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`🚀 API running on http://localhost:${info.port}`);
	},
);
