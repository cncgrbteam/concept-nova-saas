import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary-100 flex justify-between lg:justify-center items-center h-[8vh] text-xs lg:text-sm lg:gap-x-20 px-wrapper md:px-wrapper-md">
      <Link
        href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
        target="_blank"
        referrerPolicy="no-referrer"
        className="text-primary-200 hover:text-primary-300"
      >
        Help
      </Link>
      <Link
        href="/privacy-policy"
        className="text-primary-200 hover:text-primary-300"
      >
        Privacy Policy
      </Link>
      <Link
        href="/terms-and-conditions"
        className="text-primary-200 hover:text-primary-300"
      >
        Terms &amp; Conditions
      </Link>
    </footer>
  );
};
