import { NextPage } from "next";
import React from "react";
import { deleteCookie, getCookie, setCookie } from "@utils";
import { redisApi } from "@services";

type Props = {
  authSession: string;
};

const loginPage = "/";

export const withAuth = (WrappedComponent: NextPage) => {
  const AuthWrapper: NextPage<Props> = ({ authSession, ...props }: Props) => {
    return <WrappedComponent {...props} />;
  };

  AuthWrapper.getInitialProps = async (context: any) => {
    const authSession = getCookie("auth-token", context.req);

    let userAgent;

    if (context.req) {
      userAgent = context.req.headers["user-agent"];
    }

    if (typeof window !== "undefined") {
      userAgent = window.navigator.userAgent;
    }

    // make request to redis server to get the token
    const tokenFromRedis = await redisApi.getAuthToken(userAgent);

    // if there's no token in redis server, redirect to login page
    if (!tokenFromRedis) {
      // delete cookie, if there's any
      deleteCookie("auth-token", context.req);

      // redirect to login page
      if (context.res) {
        // server side
        context.res.writeHead(302, { Location: loginPage });

        context.res.end();
      }

      if (typeof window !== "undefined") {
        // client side
        window.location.href = loginPage;
      }
    }

    // if there's token in redis server, save it to cookie
    // so that the user can access the page without login again
    if (tokenFromRedis && !authSession) {
      setCookie("auth-token", tokenFromRedis, context.req);
    }

    // if there's token in redis server, but it doesn't match with the token in cookie, update the cookie
    if (tokenFromRedis && authSession && tokenFromRedis !== authSession) {
      setCookie("auth-token", tokenFromRedis, context.req);
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context));

    return { ...componentProps, authSession: authSession as string };
  };

  return AuthWrapper;
};
