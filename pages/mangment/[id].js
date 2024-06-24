import React from "react";
import styles from "@/styles/mangment.module.scss";
import img from "@/public/images/mangment/jamie-street-gZlQZFCA1Vc-unsplash.png";
import img2 from "@/public/images/imgUser.png";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Image from "next/image";
import PageUser from "@/components/PageUser";

const Index = () => {
  const { query } = useRouter();

  console.log(query.id);
  const { t } = useTranslation("mangment");
  const { locale } = useRouter();


  return (
   
      <PageUser >
        <div className="container mx-auto">
          <div className="ownerInfo">
            <div className="imgOwner">
              <Image
                width={200}
                height={200}
                className="max-h-[200px] "
                src={img2.src}
                alt={"alt"}
              ></Image>
            </div>
            <span className="text-2xl sm:text-3xl md:text-5xl text-[#3a3a3a] font-extrabold text-center">
              <p className="mt-1 md:mt-[10px] mb-4 md:mb-8">name</p>
            </span>

            <div className="conentOwner">
              <p>cv Owner</p>
            </div>
          </div>
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
