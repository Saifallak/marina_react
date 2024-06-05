import React from "react";
import styles from "@/styles/mangment.module.scss";
import img from "@/public/images/mangment/jamie-street-gZlQZFCA1Vc-unsplash.png";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const { t } = useTranslation("mangment");
  const { locale } = useRouter();
  const mangment = [
    {
      en: " SAFWA \n EL NAHAS",
      ar: "صفوة\n النحاس",
    },
    {
      en: "MOHAMED \nABDELKADER\n SALEM \n(Board  member)",
      ar: "محمد عبد القادر سالم (عضو  \n مجلس الإدارة)",
    },
    {
      en: "SAMIR \n YOUSSEF \n EL SAIAD (Board  member)",
      ar: "سمير يوسف الصياد (عضو  \n مجلس الإدارة)",
    },
    {
      en: "HATEM \n  MAHMOUD \n HASSAN (Board  member)",
      ar: "حاتم محمود حسن (عضو  \n مجلس الإدارة)",
    },
    {
      en: "HASSAN\n  ISAMIL\n  GHANEM (Board  member)",
      ar: "حسن إسماعيل غانم (عضو  \n مجلس الإدارة)",
    },
    {
      en: "MOHAMED\n  SAAD\n  EL SHERBINI (Board  member)",
      ar: "محمد سعد الشربيني (عضو  \n مجلس الإدارة)",
    },
    {
      en: "IBRAHIM \n SABRY\n  ABDELHAMID (Board  member)",
      ar: "إبراهيم صبري عبد الحميد (عضو  \n مجلس الإدارة)",
    },
    {
      en: "HASSAN\n  ISAMIL\n  GHANEM (Board  member)",
      ar: "حسن إسماعيل غانم (عضو  \n مجلس الإدارة)",
    },
    {
      en: "MOHAMED \n ABDELFATAH\n  EL GAMAL (Board  member)",
      ar: "محمد عبد الفتاح الجمل (عضو  \n مجلس الإدارة)",
    },
    {
      en: "ASHRAF\n  EL SAMALIGI (Board  member)",
      ar: "أشرف السمالجي (عضو  \n مجلس الإدارة)",
    },
    {
      en: "ABDELAAL \n EL SHEIKH (Board  member)",
      ar: "عبد العال الشيخ (عضو  \n مجلس الإدارة)",
    },
    {
      en: "ABDELHAMID \n MOHAMED (Board  member)",
      ar: "عبد الحميد محمد (عضو  \n مجلس الإدارة)",
    },
    {
      en: "WALID \n ABBAS (Board  member)",
      ar: "وليد عباس (عضو  \n مجلس الإدارة)",
    },
    {
      en: "AHMED \n ABDELAZIZ (Board  member)",
      ar: "أحمد عبد العزيز (عضو  \n مجلس الإدارة)",
    },
    {
      en: "AbdelAl \n Ali \n AbdelAl (Board  member)",
      ar: "عبد العال عبد العال (عضو  \n مجلس الإدارة)",
    },
  ];
  
  return (
    <>
      <PageComponent styles={styles} title={t("mangment")} hero={img.src}>
        <span className="text-2xl sm:text-3xl md:text-5xl text-[#3a3a3a] font-extrabold text-center">
          <p className="mt-2 md:mt-[40px] mb-5 md:mb-10">{t("border")}</p>
        </span>
        <div className="container mx-auto">
          <Link href={"#"} className={styles.CardOne}>
            <p>{mangment[0][locale]}</p>
          </Link>
          <div className={styles.imgContainerTwo}>
            <div className="flex w-full gap-2 md:gap-5">
              <Link href="#" className={styles.CardTwo}>
                <p>{mangment[1][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardThree}>
                <p>{mangment[2][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardFour}>
                {" "}
                <p>{mangment[3][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardFive}>
                <p>{mangment[4][locale]}</p>
              </Link>
            </div>
            <div className="flex w-full gap-2 md:gap-5">
              <Link href="#" className={styles.CardSex}>
                <p>{mangment[5][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardSeven}>
                <p>{mangment[6][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardEight}>
                <p>{mangment[7][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardNine}>
                <p>{mangment[8][locale]}</p>
              </Link>
            </div>
            <div className="flex w-full gap-2 md:gap-5">
              <Link href="#" className={styles.CardTen}>
                <p>{mangment[9][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardEleven}>
                <p>{mangment[10][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardTwelve}>
                <p>{mangment[11][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardThirteen}>
                <p>{mangment[12][locale]}</p>
              </Link>
            </div>
            <div className="flex gap-2 w-[52%] md:gap-5">
              <div className={styles.CardFourteen}></div>
              <Link href="#" className={styles.CardFifteen}>
                <p>{mangment[13][locale]}</p>
              </Link>
              <Link href="#" className={styles.CardSixteen}>
                <p>{mangment[14][locale]}</p>
              </Link>
              <div className={styles.CardSeventeen}></div>
            </div>
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
      ...(await serverSideTranslations(context.locale, ["mangment", "common"])),
    },
  };
};
