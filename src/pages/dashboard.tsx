import { Layout } from "@components";
import { useAlertHandler } from "@context";
import { withAuth } from "@hoc";
import { accountApi, appSuiteApi } from "@services";
import { IApiError, IProject, IUser } from "@utils";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { handleAlert } = useAlertHandler();

  const {
    isLoading: isUserDetailsLoading,
    data: userDetails,
    isSuccess: isUserDetailsSuccess,
  } = useQuery<IUser, IApiError>(
    "userDetails",
    () => accountApi.getUserDetails(),
    {
      onError: (err) => {
        // Pass the error to your global error handler
        handleAlert({
          type: "error",
          message: err?.message || "Unable to fetch user details",
        });
      },
    }
  );

  const {
    isLoading: isProjectsLoading,
    data: projects,
    isSuccess: isProjectsFetchSuccess,
  } = useQuery<IProject[], IApiError>(
    "projects",
    () => appSuiteApi.getAppSuites(),
    {
      onError: (err) => {
        // Pass the error to your global error handler
        handleAlert({
          type: "error",
          message: err?.message || "Unable to fetch applications",
        });
      },
    }
  );

  return (
    <Layout title={`${userDetails?.firstname ?? "Concept-Nova"}'s Dashboard`}>
      <section className="px-wrapper md:px-wrapper-md xl:px-wrapper-xl min-h-[84vh] py-12 lg:py-20">
        {!isUserDetailsLoading && isUserDetailsSuccess ? (
          <div className="flex gap-y-4 gap-x-10 flex-col lg:flex-row items-center">
            <div className="shadow-md p-10 rounded-md">
              <FaUserCircle size={60} className="text-primary" />
            </div>
            <div>
              <h1 className="xl:text-2xl font-semibold">
                Welcome back, {userDetails?.firstname}
              </h1>
              <p className="text-xs text-primary">{userDetails?.email}</p>
              <p className="text-xs text-black">
                Organisation: {userDetails?.organization?.name}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-10 flex-col lg:flex-row items-center animate-pulse">
            <div className="shadow-md p-11 bg-white rounded-md">
              <div className="bg-slate-200 p-6 rounded-full"></div>
            </div>
            <div>
              <div className="h-4 bg-slate-200 rounded w-64 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-56 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-36 mb-2"></div>
            </div>
          </div>
        )}

        <div className="my-10">
          <h2 className="text-sm font-semibold mb-10"> Applications</h2>
          <ul className="bg-primary-100 rounded-md grid grid-cols-1 divide-y divide-slate-200">
            {isProjectsLoading &&
              [...Array(2)].map((_item, index: number) => (
                <li key={index}>
                  <div className="block flex flex-col lg:flex-row items-start gap-x-10 gap-y-2 p-6">
                    <div className="shadow p-5 bg-white w-auto rounded-md">
                      <div className="bg-slate-200 p-6 rounded-full transition-all duration-200 ease-in-out animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-3 lg:h-4 bg-slate-200 rounded w-36 md:w-56 lg:w-64 mb-2 transition-all duration-200 ease-in-out animate-pulse"></div>
                      <div className="h-2 lg:h-3 bg-slate-200 rounded w-24 md:w-48 lg:w-56 mb-2 transition-all duration-200 ease-in-out animate-pulse"></div>
                      <div className="h-2 lg:h-3 bg-slate-200 rounded w-16 md:w-28 lg:w-36 mb-2 transition-all duration-200 ease-in-out animate-pulse"></div>
                    </div>
                  </div>
                </li>
              ))}

            {isProjectsFetchSuccess &&
              projects &&
              projects.map((project: IProject, index: number) => (
                <li key={index}>
                  <Link
                    href={project.url}
                    className="block flex flex-col lg:flex-row items-start gap-x-10 gap-y-2 transition-color duration-500 ease-in-out hover:bg-slate-200 p-6"
                    target={"_blank"}
                    referrerPolicy={"no-referrer"}
                  >
                    <div className="shadow p-5 bg-white w-auto rounded-md">
                      <FaUserCircle size={50} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary">
                        {project.name}
                      </h3>
                      <p className="text-xs text-primary-400 mt-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};
export default withAuth(Dashboard);
