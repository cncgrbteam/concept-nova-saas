import Image from "next/image";
import { PageBannerProps } from "./PageBanner.type";

export const PageBanner = ({ backgroundImage, title }: PageBannerProps) => {
  return (
    <div className="h-32 md:h-40 xl:h-56 bg-slate-200 w-full flex items-center justify-center relative bg-privacyBanner">
      {/* Image overlay */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          priority
          placeholder="blur"
          alt=""
          className="absolute  h-full w-full z-1"
        />
      )}

      {/* overlay background  */}
      <div className="absolute bg-[#000000] opacity-40 h-full w-full z-2"></div>
      <h1 className="text-2xl xl:text-4xl font-medium text-center z-10 text-white">
        {title}
      </h1>
    </div>
  );
};
