import { apiService } from "@services";

export const appSuiteApi = {
  getAppSuites: async () => await apiService.get("/saas/applications"),
};
