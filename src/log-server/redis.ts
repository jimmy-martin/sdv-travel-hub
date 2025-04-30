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
const newOffersLogs: Log[] = [];
const MAX_LOGS = 100;

export async function subscribeToOffers() {
	const sub = redis.duplicate();
	await sub.connect();

	await sub.subscribe("offers:new", (message) => {
		newOffersLogs.unshift({
			date: new Date(),
			message,
			content: JSON.parse(message),
		});
		if (newOffersLogs.length > MAX_LOGS) newOffersLogs.pop();
		console.log("📨 New offer published:", message);
	});
}

export function getNewOffersLogs() {
	return newOffersLogs;
}
