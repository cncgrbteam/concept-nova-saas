import { Meta, Header, Footer, GlobalAlert, AuthHeader } from "@components";
import { useAuth } from "@context";
import { useEffect, useState } from "react";
import { LayoutProps } from "./Layout.type";

export const Layout = ({
  children,
  title,
  description,
  pxPadding = true,
  basicHeader = false,
}: LayoutProps) => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const { isLogged: initialIsLogged } = useAuth();

  useEffect(() => {
    setIsLogged(initialIsLogged);
  }, [initialIsLogged]);
  return (
    <>
      <Meta title={title} description={description} />
      <div>
        <header className="bg-white px-wrapper md:px-wrapper-md shadow h-[8vh] flex items-center">
          {isLogged && !basicHeader && <AuthHeader />}

          {(!isLogged && isLogged !== null) || basicHeader ? <Header /> : null}
        </header>

        <GlobalAlert />
        <main className={`${pxPadding && "xl:px-[10rem]"}`}>{children}</main>
        <Footer />
      </div>
    </>
  );
};
