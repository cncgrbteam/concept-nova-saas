import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getCookie } from "@utils";

type Props = {
  authSession: string;
};

const loginPage = "/";

export const withAuth = (WrappedComponent: NextPage) => {
  const AuthWrapper: NextPage<Props> = ({ authSession, ...props }: Props) => {
    const router = useRouter();

    if (!authSession) {
      router.push(loginPage);
      return null;
    }
    return <WrappedComponent {...props} />;
  };

  AuthWrapper.getInitialProps = async (context: any) => {
    const authSession = getCookie("auth-token", context.req);
    if (!authSession) {
      context.res.writeHead(302, { Location: loginPage });
      context.res.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context));

    return { ...componentProps, authSession: authSession as string };
  };

  return AuthWrapper;
};
