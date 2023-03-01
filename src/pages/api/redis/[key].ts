import { createRedisInstance } from "@config/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let redis = createRedisInstance();

  // get the key  from the request
  const { key } = req.query;

  let cache = await redis.get(key! as string);
  return res
    .status(200)
    .json({ data: cache, isSuccess: true, message: "success", status: 200 });
  // cache = JSON.parse(cache as string);
  // if (cache) {
  //   return res
  //     .status(200)
  //     .json({ data: cache, isSuccess: true, message: "success", status: 200 });
  // } else {
  //   return res.status(200).json({
  //     isSuccess: false,
  //     message: "No cache data found",
  //     status: 404,
  //   });
  // }
}
