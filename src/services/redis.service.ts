import { internalApiService } from "@services";
import { IRedisData } from "@utils";
import { AxiosResponse } from "axios";

export const redisApi = {
  saveToken: async (payload: IRedisData): Promise<AxiosResponse> =>
    await internalApiService().post({ url: "/redis/token/save", payload }),
  deleteToken: async (): Promise<AxiosResponse> =>
    await internalApiService().delete({ url: `/redis/token/delete` }),
  getAuthToken: async (userAgent?: string) =>
    await internalApiService(userAgent).get("/redis/token"),
};
