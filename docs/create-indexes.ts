import getDb from "../src/instances/mongo.js";

const createIndexes = async () => {
    const db = await getDb();
    await db.collection("offers").createIndex({ from: 1, to: 1, price: 1 });
    await db.collection("offers").createIndex({ provider: "text" });

    console.log("Indexes created");
};

try {
    await createIndexes();
    process.exit(0);
} catch (err) {
    console.error(err);
    process.exit(1);
}

