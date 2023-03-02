import { Logo } from "@/assets/images";
import { useAlertHandler, useAuth } from "@context";
import { accountApi } from "@services";
import { IApiError, IUser } from "@utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { useQuery } from "react-query";

export const AuthHeader = () => {
  const { handleAlert } = useAlertHandler();
  const { logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleDropdown = () => {
    setShowDropdown((prev: boolean) => !prev);
  };

  const handleLogout = () => {
    logout();
    // redirect to login page
    // router.push("/");
  };

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

  return (
    <div className="flex justify-between items-center w-full">
      <Link href={"/"}>
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={40}
          className="w-auto h-auto"
          placeholder="blur"
        />
      </Link>

      <div className="flex items-center">
        {/* user icon that has a dropdown menu of logout */}
        <div className="relative">
          <button
            className="flex items-center gap-x-1 xl:gap-x-3 text-gray-700 focus:outline-none"
            onClick={handleDropdown}
          >
            {/* user icon in round shape */}
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-200">
              <FaUser className="h-3 w-3 text-gray-500" />
            </div>

            {!isUserDetailsLoading && isUserDetailsSuccess ? (
              <div className="flex gap-x-2 items-center font-medium">
                <span className="text-xs">
                  {userDetails?.firstname}{" "}
                  <span className="hidden md:inline">
                    {userDetails?.lastname}
                  </span>
                </span>
                <SlArrowDown className="text-xs" />
              </div>
            ) : (
              <div>
                <div className="bg-slate-200 h-3 rounded-md w-36"></div>
                <div className="bg-slate-200 h-2 rounded-md w-20 mt-1"></div>
              </div>
            )}
          </button>
          {showDropdown && (
            <div className="absolute -right-3 md:right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
              <div className="py-1">
                <button
                  className="block w-full md:h-12 px-4 py-2 text-xs text-red-500 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
