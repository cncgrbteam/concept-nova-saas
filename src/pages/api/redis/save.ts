import { createRedisInstance } from "@config/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let redis = createRedisInstance();

  //   get key and value from the request body
  const { key, value } = req.body;

  const MAX_AGE = process.env.NEXT_PUBLIC_AUTH_EXPIRY ?? 60_000 * 60; // 1 hour
  const EXPIRY_TYPE = `EX`; // seconds
  const result = await redis.set(key, value, EXPIRY_TYPE, MAX_AGE);

  if (result === "OK") {
    return res
      .status(200)
      .json({ isSuccess: true, message: "success", status: 200 });
  } else {
    return res.status(200).json({
      isSuccess: false,
      message: "Unable to save data",
      status: 500,
    });
  }
}
