import type { Context, Next } from "hono";

const forceJsonHeadersMiddleware = async (c: Context, next: Next) => {
	await next();
	if (c.error) {
		c.header("Content-Type", "application/json");
	}
};

export default forceJsonHeadersMiddleware;
