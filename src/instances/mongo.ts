import { type Db, MongoClient } from "mongodb";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const mongoClient = new MongoClient(mongoUrl);

let db: Db;

const getDb = async (dbName = "sdv-travel-hub") => {
	if (!db) {
		db = mongoClient.db(dbName);
	}
	return db;
};

export default getDb;
