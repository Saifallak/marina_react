import Image from "next/image";
import React from "react";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";
import { Button } from "@mantine/core";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeCard = ({ title, image, reverse, id, t }) => {
  return (
    <div
      className={`container mx-auto  flex flex-wrap items-center gap-3 sm:gap-10  mt-[50px] ${
        reverse && "flex-row-reverse"
      }`}
    >
      <div className="relative h-[25vh] w-[25vh] rounded-[40px] overflow-hidden">
        {(
          <Image
            src={image[0]}
            srcSet={image}
            fill
            loading="lazy"
            decoding="async"
            sizes="100%"
            className="object-cover"
            alt={title}
          />
        ) || <Skeleton count={10} />}
      </div>
      <div className={`flex-1 ${reverse && "text-right"}`}>
      <h3 className="md:text-2xl text-lg font-extrabold mb-8 leading max-w-xs break-words">
        {title}
      </h3>

        <Link href={`/whatToDo/${id}`}>
          <Button className={styles.btn}>{t("readNowBtn")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
