import { createClient } from "redis";

const redis = createClient({
	url: process.env.REDIS_URL || "redis://localhost:6379",
});
await redis.connect();

type DeserializedOffer = {
	offerId: string;
	from: string;
	to: string;
};
type Log = {
	date: Date;
	message: string;
	content: DeserializedOffer;
};
const logs: Log[] = [];
const MAX_LOGS = 100;

export async function subscribeToOffers() {
	const sub = redis.duplicate();
	await sub.connect();

	await sub.subscribe("offers:new", (message) => {
		logs.unshift({
			date: new Date(),
			message,
			content: JSON.parse(message),
		});
		if (logs.length > MAX_LOGS) logs.pop();
		console.log("📨 New offer published:", message);
	});
}

export function getLogs() {
	return logs;
}
