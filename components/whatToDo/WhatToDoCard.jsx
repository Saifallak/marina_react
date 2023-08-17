import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import styles from "../../styles/whatToDo.module.scss";

const WhatToDoCard = ({ image, titleOne, id, t }) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${image[0]})`,
      }}
    >
      <div className={styles.contantCard}>
        <p>{titleOne}</p>
        <Link href={`/whatToDo/${id}`} >
          <Button
            variant="default"
            className="uppercase bg-black text-white border-none font-black text-[16px] sm:text-[20px] lg:text-[30px] h-[54px] lg:h-[80px] px-6  sm:px-10 rounded-3xl bottom-1 hover:bg-black"
          >
            {t("buttonRead")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WhatToDoCard;
