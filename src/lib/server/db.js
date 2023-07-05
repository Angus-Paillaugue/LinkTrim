import { MongoClient } from "mongodb"
import { MONGODB_CONNEXION_STRING } from "$env/static/private"

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();

const database = client.db('urlShortener');

const linksRef = database.collection("links");
const usersRef = database.collection("users");
const statisticsRef = database.collection("statistics");

export { usersRef, linksRef, statisticsRef }