import { internalApiService } from "@services";
import { IRedisData } from "@utils";
import { AxiosResponse } from "axios";

export const redisApi = {
  save: async (payload: IRedisData): Promise<AxiosResponse> =>
    await internalApiService.post({ url: "/redis/save", payload }),
  delete: async (key: string): Promise<AxiosResponse> =>
    await internalApiService.delete({ url: `/redis/delete/${key}` }),
  getAuthToken: async () => await internalApiService.get("/redis/auth-token"),
};
