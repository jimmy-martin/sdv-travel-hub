import { promisify } from "node:util";
import { gunzip, gzip } from "node:zlib";
import redis from "../instances/redis.js";

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

const setCache = async ({
	key,
	value,
	ttl,
}: { key: string; value: string; ttl: number }) => {
	const compressed = await gzipAsync(value);
	await redis.set(key, compressed.toString("binary"), { EX: ttl });
};

const getCache = async (key: string) => {
	const compressed = await redis.get(key);
	if (!compressed) {
		return null;
	}

	const buffer = Buffer.from(compressed, "binary");
	const decompressed = await gunzipAsync(buffer);
	return decompressed.toString();
};

const publish = async ({
	channel,
	message,
}: { channel: string; message: string }) => {
	await redis.publish(channel, message);
};

export { setCache, getCache, publish };
