import { getNeo4jSession } from "../instances/neo4j.js";

type Recommendation = {
	city: string;
	name: string;
	score: number;
};

const getRecommendations = async (
	city: string,
	limit = 3,
): Promise<Recommendation[]> => {
	const session = await getNeo4jSession();

	const result = await session.run(
		`MATCH (c:City {code:$city})-[n:NEAR]->(cc:City) 
        RETURN cc.code AS city, cc.name AS name, n.weight AS score
        ORDER BY score DESC LIMIT ${limit}`,
		{ city: city },
	);

	return result.records.map((record) => ({
		city: record.get("city"),
		name: record.get("name"),
		score: record.get("score"),
	}));
};

export { getRecommendations };
