const { MongoClient } = require('mongodb');

const mongoUri = "mongodb://127.0.0.1:27017";
const dbName = "MERNTodoApp";

let dbInstance = null;

async function connectMongo() {
  if (dbInstance) return dbInstance;

  try {
    const client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    dbInstance = client.db(dbName);
    console.log("✅ MongoDB connected to", dbName);
    return dbInstance;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

function GetCollectionObj(collName) {
	if (!dbInstance) {
		throw new Error("MongoDB not connected. Call connectMongo() first.");
	}
	return dbInstance.collection(collName);
}

module.exports = { connectMongo, GetCollectionObj };
