import Link from "next/link";
import React from "react";
const WhereToGoCard = ({ link, image, t }) => {
  return (
    <div
      className="flex-1 md:max-w-[25vw] min-w-[100px] h-[10vh] md:h-[25vh] lg:h-[38vh] bg-cover bg-center bg-[#0cceff] rounded-2xl cursor-pointer font-extrabold"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <Link href={link}>
        <span className="h-full text-white flex items-center justify-center text-[12px] sm:text-lg lg:text-3xl">
          {image ? "" : "VIEW MORE"}
        </span>
      </Link>
    </div>
  );
};

export default WhereToGoCard;
