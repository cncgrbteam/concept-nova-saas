import { Button, Layout, LoginForm } from "@components";
import { getCookie } from "@utils";

const AuthPage = () => {
  return (
    <Layout>
      <section className="px-wrapper xl:px-wrapper-xl min-h-[84vh] flex items-center">
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-4/12 mx-auto xl:px-4">
          <div className="text-2xl font-semibold text-center">Welcome</div>
          <LoginForm />
          <div className="flex justify-content items-center gap-2 my-6">
            <div className="bg-[#C5C5C5] w-full h-px"></div>
            <div className="font-bold text-xs">
              Not&nbsp;a&nbsp;customer&nbsp;yet?
            </div>
            <div className="bg-[#C5C5C5] w-full h-px"></div>
          </div>
          <Button as="link" className="h-12 block w-full" variant="white">
            <span className="font-light text-xs">Get started</span>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const authToken = getCookie("auth-token", context.req);

  if (authToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AuthPage;
