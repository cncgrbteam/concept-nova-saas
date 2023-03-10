import { Error500Image } from "@assets/images";
import { Button, Layout } from "@components";
import Image from "next/image";
import { useRouter } from "next/router";

const Error500 = () => {
  const router = useRouter();
  return (
    <Layout>
      <section className="py-12 xl:py-20 px-wrapper md:px-wrapper-md xl:px-[10rem] min-h-[84vh] flex flex-col justify-center items-center gap-4">
        <Image
          src={Error500Image}
          alt="Internal Server Error"
          placeholder="blur"
          width={400}
          height={400}
        />
        <h1 className="font-bold text-xl">There's been a bit of a hitch</h1>
        <p className="text-sm font-light text-center">
          We're not quite sure what's gone wrong. You can go{" "}
          <br className="hidden md:block" /> back or try looking in our Help
          Centre if you need a <br className="hidden md:block" /> hand.
        </p>
        <div className="flex justify-center gap-10">
          <Button onClick={() => router.back()}>Go back</Button>{" "}
          <Button as="link" variant="white" href={`/dashboard`}>
            Dashboard
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Error500;
