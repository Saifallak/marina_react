"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/mangment.module.scss";
import img from "@/public/images/mangment/jamie-street-gZlQZFCA1Vc-unsplash.png";
import img2 from "@/public/images/imgUser.png";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Image from "next/image";
import PageUser from "@/components/PageUser";
import { getOneDirectors } from "@/components/useApi/dataApi";
import { Skeleton } from "@mantine/core";

const Index = () => {
  const { query } = useRouter();
  console.log(query.id);
  const { t } = useTranslation("mangment");
  const { locale } = useRouter();

  const [director, setDirector] = useState([]);
  const [Load1, setLoad1] = useState(false);
  useEffect(() => {
    FetchDataOndDirectors();
  }, []);

  const FetchDataOndDirectors = async () => {
    setLoad1(true);
    const Director = await getOneDirectors(query.id);
    if (!Director) console.log(Director?.message);
    setDirector(Director);
    setLoad1(false);
  };
  console.log("====================================");
  console.log(director);
  console.log("====================================");
  function createMarkup(item) {
    return {
      __html: locale === "en" ? item.en : item.ar,
    };
  }
  return (
    <PageUser>
      <div className="container mx-auto min-h-[50vh]">
        {Load1 && (
          <div className="loadDiv" style={{ marginTop: "50px" }}>
            <Skeleton height={100} width={"90%"} radius="8px" />
            <Skeleton height={100} width={"90%"} radius="8px" />
           
          </div>
        )}
        {director.id ? (
          <div className="ownerInfo">
            <div className="imgOwner">
              <Image
                width={200}
                height={200}
                className="max-h-[200px] "
                src={director.image.url}
                alt={director.name[locale]}
              ></Image>
            </div>
            <span className="text-2xl sm:text-3xl md:text-5xl text-[#3a3a3a] font-extrabold text-center">
              <p className="mt-1 md:mt-[10px] mb-4 md:mb-8">{director.name[locale]}</p>
            </span>

            <div className="conentOwner" dangerouslySetInnerHTML={createMarkup(director.cv)}>
            </div>
          </div>
        ) : null}
      </div>
    </PageUser>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["mangment", "common"])),
    },
  };
};
