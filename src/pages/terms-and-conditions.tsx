import { Breadcrumbs, Layout, PageBanner } from "@components";
import { TandCBanner } from "@assets/images";

const TermsAndConditions = () => {
  return (
    <Layout
      title="Privacy Policy |  Concept-Nova SaaS Solution"
      pxPadding={false}
    >
      <Breadcrumbs />
      <PageBanner
        backgroundImage={TandCBanner}
        title="Terms  &amp; Conditions"
      />
      <section className="py-12 xl:py-20 xl:px-[10rem] min-h-[54.5vh]">
        <div className="px-wrapper xl:px-wrapper-xl text-sm xl:text-base font-light">
          <p>
            Duis nunc enim faucibus lorem. Tempor, molestie quam vestibulum
            imperdiet volutpat justo, dictum venenatis. Id tincidunt facilisi
            sit nisl, ac sed scelerisque sed porttitor. Dictum ac, scelerisque
            porttitor at bibendum sagittis. Quisque eget facilisis at
            pellentesque ipsum. Odio mattis quam et, ultrices volutpat at
            gravida faucibus felis. Convallis adipiscing cursus diam sed porta
            sapien. Dui sollicitudin justo vestibulum, faucibus lectus tincidunt
            neque, eu. Facilisi sed sit scelerisque viverra et. Potenti
            convallis quis proin in. Bibendum lectus arcu eu netus sit
            scelerisque magnis fames.
          </p>
          <p>
            Duis nunc enim faucibus lorem. Tempor, molestie quam vestibulum
            imperdiet volutpat justo, dictum venenatis. Id tincidunt facilisi
            sit nisl, ac sed scelerisque sed porttitor. Dictum ac, scelerisque
            porttitor at bibendum sagittis. Quisque eget facilisis at
            pellentesque ipsum. Odio mattis quam et, ultrices volutpat at
            gravida faucibus felis. Convallis adipiscing cursus diam sed porta
            sapien. Dui sollicitudin justo vestibulum, faucibus lectus tincidunt
            neque, eu. Facilisi sed sit scelerisque viverra et. Potenti
            convallis quis proin in. Bibendum lectus arcu eu netus sit
            scelerisque magnis fames.
          </p>
          <p>
            Duis nunc enim faucibus lorem. Tempor, molestie quam vestibulum
            imperdiet volutpat justo, dictum venenatis. Id tincidunt facilisi
            sit nisl, ac sed scelerisque sed porttitor. Dictum ac, scelerisque
            porttitor at bibendum sagittis. Quisque eget facilisis at
            pellentesque ipsum. Odio mattis quam et, ultrices volutpat at
            gravida faucibus felis. Convallis adipiscing cursus diam sed porta
            sapien. Dui sollicitudin justo vestibulum, faucibus lectus tincidunt
            neque, eu. Facilisi sed sit scelerisque viverra et. Potenti
            convallis quis proin in. Bibendum lectus arcu eu netus sit
            scelerisque magnis fames.
          </p>
        </div>
      </section>
    </Layout>
  );
};
export default TermsAndConditions;
