import * as dotenv from "dotenv";
dotenv.config();

/** Config for the stats reporting endpoint */
export const config = {
  statsEndpointUrl: process.env.STATS_ENDPOINT as string,
  statsApiKey: process.env.STATS_API_KEY as string,
};
