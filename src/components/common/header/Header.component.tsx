import { Logo } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div>
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
      </div>
    </div>
  );
};
