import neo4j, { type Driver } from "neo4j-driver";
import "dotenv/config";

const URI = process.env.NEO4J_URI || "bolt://localhost:7687";
const USER = process.env.NEO4J_USER || "neo4j";
const PASSWORD = process.env.NEO4J_PASSWORD || "password";

let driver: Driver;

const init = async () => {
	try {
		driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
		const info = await driver.getServerInfo();
		console.log(info);
	} catch (error) {
		const cause = (error as Error).cause ?? "Unknown";
		console.log(`Connection error\n${error}\nCause: ${cause}`);
		process.exit(1);
	}
};

const getNeo4jSession = async () => {
	if (!driver) {
		await init();
	}
	return driver.session();
};

export { getNeo4jSession };
