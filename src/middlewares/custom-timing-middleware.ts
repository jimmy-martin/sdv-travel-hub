import type { Context, Next } from "hono";

const customTimingMiddleware = async (c: Context, next: Next) => {
	const start = performance.now();
	await next();
	const end = performance.now();
	const duration = end - start;
	c.header("X-Response-Time", `${Number.parseFloat(duration.toFixed(2))}ms`);
};

export default customTimingMiddleware;
