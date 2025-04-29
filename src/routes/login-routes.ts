import { Hono } from "hono";
import { getSession } from "../services/login-service.js";

const routes = new Hono();

routes.post("/", async (c) => {
	const { userId } = await c.req.json();

	const session = await getSession(userId);

	return c.json({
		token: session.uuid,
		expires_in: session.expiresIn,
	});
});

export default routes;
