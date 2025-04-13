import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <Image
        onClick={() => router.push("/")}
        className="w-28 lg:w-32 cursor-pointer"
        src="/svg/fays-hub.svg"
        alt="fays-hub"
        width={100}
        height={50}
      />
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
