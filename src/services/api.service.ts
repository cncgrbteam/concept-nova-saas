import { getCookie, setCookie } from "@utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiResource = (
  contentType = "application/json",
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!
) => {
  const service = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      "Access-Control-Allow-Methods": "*",
    },
  });

  service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // get token from cookie
    const token = getCookie("auth-token");

    // if token is not present, return config
    if (!token) return config;

    // if token is present, add it to headers
    config.headers!["auth-token"] = token;

    return config;
  });

  service.interceptors.response.use(
    (response: AxiosResponse) => {
      const responseData = response?.data;

      // check if auth-token is present in data property
      if (
        responseData &&
        responseData?.data &&
        responseData?.data["auth-token"]
      ) {
        const token = responseData.data["auth-token"];

        // save token as cookie
        setCookie("auth-token", token, 2);
      }

      return responseData;
    },
    (error: AxiosError) => {
      if (error?.response === undefined)
        Promise.reject("No internet connection");
      else {
        const errors = error?.response?.data;

        // @ts-ignore
        const errorMessage = errors?.error || errors?.message;

        if (errorMessage) {
          console.error(errorMessage);
        }
        return Promise.reject(errors);
      }
    }
  );

  interface IPostProps {
    url: string;
    payload?: object;
  }

  return {
    get: async (url: string) => {
      try {
        const data = service.get(url);
        const resolvedData = await Promise.resolve(data);
        const exactData = resolvedData?.data;

        return exactData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    post: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.post(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    patch: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.patch(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    delete: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.delete(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    put: async ({ url, payload }: IPostProps) => {
      try {
        const data = service.put(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};

export const apiService = apiResource();
export const internalApiService = apiResource(
  "application/json",
  "http://localhost:3000/api"
);
export const formDataApiService = apiResource("multipart/form-data");
