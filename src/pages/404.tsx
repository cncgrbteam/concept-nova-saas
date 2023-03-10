import { Error404Image } from "@assets/images";
import { Button, Layout } from "@components";
import Image from "next/image";

const Error404 = () => {
  return (
    <Layout>
      <section className="py-12 xl:py-20 px-wrapper md:px-wrapper-md xl:px-[10rem] min-h-[84vh] flex flex-col justify-center items-center gap-6">
        <Image
          src={Error404Image}
          alt="Page not Found"
          width={500}
          height={500}
          placeholder="blur"
        />
        <h1 className="font-bold text-2xl">Page not Found</h1>
        <p className="text-sm font-light text-center">
          The page you are looking for is currently not available,{" "}
          <br className="hidden md:block" /> please try again later.
        </p>
        <Button as="link" href={`/dashboard`}>
          Dashboard
        </Button>
      </section>
    </Layout>
  );
};

export default Error404;
