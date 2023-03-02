import {
  createRedisInstance,
  generateAuthTokenKey,
} from "@utils/helper/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let redis = createRedisInstance();

  const key = generateAuthTokenKey(req);

  await redis.del(key! as string);
  return res
    .status(200)
    .json({ isSuccess: true, message: "Deleted successfully", status: 200 });
}
