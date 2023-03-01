import { apiService } from "@services";
import { IUser } from "@utils";

export const accountApi = {
  login: async (payload: IUser) =>
    await apiService.post({ url: "/login", payload }),
  getUserDetails: async () => await apiService.get("/users/userDetails"),
};
