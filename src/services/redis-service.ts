import redis from "../instances/redis.js";

const setCache = async ({
	key,
	value,
	ttl,
}: { key: string; value: string; ttl: number }) => {
	await redis.set(key, value, { EX: ttl });
};

const getCache = async (key: string) => {
	return await redis.get(key);
};

const publish = async ({
	channel,
	message,
}: { channel: string; message: string }) => {
	await redis.publish(channel, message);
};

export { setCache, getCache, publish };
