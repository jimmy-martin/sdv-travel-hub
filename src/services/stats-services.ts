import getDb from "../instances/mongo.js";
import { getCache, setCache } from "./redis-service.js";

const getTopDestinations = async (limit = 10) => {
	const key = `top-destinations:${limit}`;
	const cache = await getCache(key);
	if (cache) {
		return JSON.parse(cache);
	}

	const db = await getDb();

	const topDestinations = await db
		.collection("offers")
		.aggregate([
			{
				$group: {
					_id: "$to",
					name: { $first: "$to" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { count: -1 } },
			{ $limit: limit },
			{ $project: { _id: 0, to: 1, count: 1, name: 1 } },
		])
		.toArray();

	await setCache({
		key,
		value: JSON.stringify(topDestinations),
		ttl: 60,
	});

	return topDestinations;
};

export { getTopDestinations };
