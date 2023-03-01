import { redisApi } from "@services";
import { deleteCookie, getCookie, IRedisData, IRedisResponse } from "@utils";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useMutation } from "react-query";
import { useAlertHandler } from "./AlertContext";

type authContextType = {
  isLogged: boolean;
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const authContextDefaultValues: authContextType = {
  isLogged: getCookie("auth-token") ? true : false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const { handleAlert } = useAlertHandler();

  const [isLogged, setIsLogged] = useState<boolean>(
    authContextDefaultValues.isLogged
  );

  const { mutate: mutateToRedisServer } = useMutation({
    mutationFn: (payload: IRedisData) => {
      return redisApi.save(payload);
    },
    onSuccess: async (data) => {
      // @ts-ignore
      const response: IRedisResponse = data;

      if (response.isSuccess) {
        setIsLogged(true);
      } else {
        handleAlert({
          type: "error",
          message:
            "Opps! Something went wrong with our data persistent server. Please try sign in again.",
        });
      }
    },
  });

  const { mutate: redisLogoutMutation } = useMutation({
    mutationFn: () => {
      return redisApi.delete("auth-token");
    },
    onSuccess: async (data) => {
      // @ts-ignore
      const response: IRedisResponse = data;

      if (response.isSuccess) {
        setIsLogged(false);
        deleteCookie("auth-token");
      } else {
        handleAlert({
          type: "error",
          message:
            "Opps! Something went wrong with our data persistent server. Please try logout again.",
        });
      }
    },
  });

  const login = (token: string) => {
    // make api call to  save token to redis
    mutateToRedisServer({
      key: "auth-token",
      value: token,
    });
  };

  const logout = () => {
    // make api call to delete token from redis
    redisLogoutMutation();
  };

  const value = {
    isLogged,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
