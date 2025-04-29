import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { timing } from "hono/timing";
import loginRoutes from "./routes/login-routes.js";
import offersRoutes from "./routes/offers-routes.js";
import recommendationRoutes from "./routes/recommendation-routes.js";
import statsRoutes from "./routes/stats-routes.js";

const app = new Hono();

app.use(timing());

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
