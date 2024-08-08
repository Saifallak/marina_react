/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/guide.module.scss";
import img from "../../public/images/guide/joseph-barrientos-oQl0eVYd_n8-unsplash.webp";
import imgOne from "../../public/images/guide/oliver-sjostrom-4pxycrNRhvg-unsplash.webp";
import imgTwo from "../../public/images/guide/two.webp";
import imgThree from "../../public/images/guide/three.webp";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import data from "../api/guide.json";
import { useRouter } from "next/router";
import { getPdf } from "@/components/useApi/dataApi";
const Index = () => {
  const { t } = useTranslation("guide");

  const [pdf,setpdf]=useState()
  const { locale } = useRouter();
  useEffect(() => {
    FetchDataOFPDF();
  }, []);
  const FetchDataOFPDF = async () => {
    const Pdf = await getPdf();
    if (!Pdf) console.log(Pdf?.message);
console.log('====================================');
console.log(Pdf);
console.log('====================================');
   setpdf(Pdf)
  };
  return (
    <>
      <PageComponent
        styles={styles}
        title={t("guide")}
        hero={img.src}
        button="buttonDownload"
        link={pdf?pdf:null}
        pdf={pdf?pdf:null}
      >
        <div className="container mx-auto">
          <div className="flex items-center mt-[100px] mb-[100px] md:mb-[150px] flex-col-reverse sm:flex-row">
            <ul className="flex-1 flex gap-5 md:gap-2 md:gap-[30px] flex-col  text-[14px] list-['-']  md:text-[16px]">
              {data[0].title[locale].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="flex-1">
              <div className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-right text-[#3a3a3a] leading-tight">
                <p className=" text-center ">
                  {t("insctructions")}
                </p>
              </div>
              <img
                src={imgOne.src}
                className="lg:w-1/2 h-full sm:w-[917px] w-[70%] m-auto"
                alt="Img One"
              />
            </div>
          </div>

          <div className="flex  items-start mb-[100px] flex-col sm:flex-row">
            <div className="flex-1">
              <div className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#3a3a3a] leading-tight">
                <p className=" text-center">{t("activity")}</p>
              </div>
              <img
                src={imgTwo.src}
                className="lg:w-1/2 mt-10 sm:w-[917px] w-[70%] sm:w-[100%] m-auto"
                alt="Img One"
              />
            </div>
            <ul className="flex-1 flex gap-5 md:gap-2 md:gap-[30px] flex-col  text-[14px] list-['-']  md:text-[16px]">
              {data[1].title[locale].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center items-center flex-col sm:flex-row">
            <div className="flex-1">
              <Image
                src={imgThree}
                width="917"
                height="967"
                className="lg:w-1/2 sm:w-[917px] w-[70%] m-auto"
                alt="Inside Marina"
              />
            </div>
            <ul className="flex-1 flex gap-5 md:gap-2 md:gap-[30px] flex-col whitespace-pre-line text-[14px] list-['-']  md:text-[16px]">
              {data[2].title[locale].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="">
            <p className="text-2xl sm:text-2xl lg:text-6xl font-extrabold text-center leading-tight mt-[100px] mb-[20px] sm:mb-[70px]">
              {t("landing")}
            </p>
          </div>
          <div className="text-[10px] sm:text-sm text-center text-[#7f7f7f] leading-relaxed">
            <ul className="flex-1 flex    flex-col whitespace-pre-line text-[14px] md:text-[20px]">
              {data[3].title[locale].map((item, i) => (
                <li key={i} className="leading-5 sm:leading-8">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageComponent>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["guide", "common"])),
    },
  };
};
