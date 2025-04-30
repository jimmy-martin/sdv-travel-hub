import { BSON, ObjectId } from "mongodb";
import getDb from "../instances/mongo.js";
import { getNeo4jSession } from "../instances/neo4j.js";
import {
	offerCacheHitCounter,
	offersCacheHitCounter,
} from "../metrics/counters/cache-hit-counter.js";
import {
	offerCacheMissCounter,
	offersCacheMissCounter,
} from "../metrics/counters/cache-miss-counter.js";
import { getRecommendations } from "./recommendation-service.js";
import { getCache, publish, setCache } from "./redis-service.js";

type GetOffersParams = {
	from: string;
	to: string;
	limit?: number;
	searchTerm?: string | null;
};

type FindCriteria = {
	from: string;
	to: string;
	$text?: { $search: string };
};

type Leg = {
	flightNum: string;
	dep: string;
	arr: string;
	duration: string;
};

type Hotel = {
	name: string;
	nights: number;
	price: number;
};

type Activity = {
	title: string;
	price: number;
};

type CreateOfferParams = {
	from: string;
	to: string;
	departDate: string;
	returnDate: string;
	provider: string;
	price: number;
	currency: string;
	legs: Leg[];
	hotel: Hotel | null;
	activity: Activity | null;
};

const getOffers = async ({
	from,
	to,
	limit = 10,
	searchTerm = null,
}: GetOffersParams) => {
	let key = `offers:${from}:${to}:${limit}`;
	if (searchTerm) {
		key += `:${searchTerm}`;
	}

	const cache = await getCache(key);
	if (cache) {
		offersCacheHitCounter.inc();
		return JSON.parse(cache);
	}

	const db = await getDb();

	const criteria: FindCriteria = {
		from,
		to,
	};

	if (searchTerm) {
		criteria.$text = { $search: searchTerm };
	}

	const offers = await db
		.collection("offers")
		.find(criteria, {
			projection: { provider: 1, price: 1, currency: 1, legs: 1 },
		})
		.sort({ price: 1 })
		.limit(Number(limit))
		.toArray();

	await setCache({
		key,
		value: JSON.stringify(offers),
		ttl: 60,
	});

	offersCacheMissCounter.inc();

	return offers;
};

const getOffer = async (id: string) => {
	const key = `offers:${id}`;
	const cache = await getCache(key);
	if (cache) {
		offerCacheHitCounter.inc();
		return JSON.parse(cache);
	}

	const db = await getDb();

	const offer = await db
		.collection("offers")
		.findOne({ _id: new ObjectId(id) });

	if (!offer) {
		return null;
	}

	offer.relatedOffers = await getRelatedOffers({
		city: offer.to,
		departDate: offer.departDate,
		returnDate: offer.returnDate,
	});

	await setCache({
		key,
		value: JSON.stringify(offer),
		ttl: 300,
	});

	offerCacheMissCounter.inc();

	return offer;
};

const getRelatedOffers = async ({
	city,
	departDate,
	returnDate,
	limit = 3,
}: {
	city: string;
	departDate: string;
	returnDate: string;
	limit?: number;
}) => {
	const relatedCities = await getRecommendations(city, limit);

	const db = await getDb();

	const offers = await db
		.collection("offers")
		.find({
			to: { $in: relatedCities.map((c) => c.city) },
			departDate,
			returnDate,
		})
		.limit(3)
		.toArray();

	return offers;
};

const createOffer = async (input: CreateOfferParams) => {
	const db = await getDb();

	const result = await db.collection("offers").insertOne(input);

	const message = {
		offerId: result.insertedId,
		from: input.from,
		to: input.to,
	};

	await publish({ channel: "offers:new", message: JSON.stringify(message) });

	return result.insertedId;
};

export { getOffers, getOffer, getRelatedOffers, createOffer };
export type { CreateOfferParams };
