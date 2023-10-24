/* eslint-disable semi */
/* eslint-disable quotes */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { ServerApiVersion, MongoClient } from "mongodb";
import { env } from "~/config/environment";
let databaseInstance = null;
// Khởi tạo
const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// kết nối
export const CONNECT_DB = async () => {
  await client.connect();
  // connect successfully and call database by name
  databaseInstance = client.db(env.DATABASE_NAME);
};
export const GET_DB = () => {
  if (!databaseInstance) throw new Error("Please connect to database first");
  return databaseInstance;
};
