import { NextApiRequest } from "next";
import crypto, { BinaryLike } from "crypto";

export const generateAuthTokenKey = (req: NextApiRequest) => {
  const userAgent = req.headers["user-agent"];
  const secret = process.env.AUTH_TOKEN_SECRET!;

  const hash = crypto
    .createHmac("sha256", secret)
    .update(userAgent as BinaryLike)
    .digest("hex");

  return hash;
};
