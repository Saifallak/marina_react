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
      className={`container mx-auto max-w-[2000px] flex items-center gap-3 sm:gap-10 md:mt-[170px] mt-[90px] ${
        reverse && "flex-row-reverse"
      }`}
    >
      <div className="relative h-[240px] md:h-[100vh] max-w-[820px]  flex-1 rounded-[40px] overflow-hidden">
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
        <h3 className="text-2xl md:text-8xl font-extrabold mb-8 leading">
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
