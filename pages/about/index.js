import { Container } from "@mantine/core";
import React from "react";
import styles from "@/styles/about.module.scss";
import PageComponent from "@/components/PageComponent";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import img from "../../public/images/about/pawel-nolbert-xe-ss5Tg2mo-unsplash.webp";
const Index = () => {
  const { t } = useTranslation("about");

  return (
    <>
      <PageComponent styles={styles} title={t("about")} hero={img.src}>
        <div className="container mx-auto sm:px-10">
          <section className={styles.sectionOne}>
            <div>
              <span className="font-extrabold text-4xl md:text-6xl lg:text-8xl text-[#3a3a3a] leading-tight">
                {t("how")}
                <br></br>
                {t("all")}
              </span>

              <p className=" text-xl sm:pr-4 text-[#3a3a3a] leading-relaxed mt-6 sm:mt-11">
                Marina Al Alamein Tourist Center is considered the finest and
                most beautiful site on the north coast and even one of the most
                beautiful and finest tourist resorts in Egypt, with its
                architectural beauty and beaches extending to more than twelve
                kilometers and natural lakes for swimming and water sports in
                addition to a complete basic structure designed and implemented
                on the latest international systems.<br></br>
                The Board of Directors of the Employees&apos; Union was elected
                in accordance with law No. 119 of 2008 and its executive
                regulations issued by the decision of Mr. Engineer/ Minister of
                Housing, Utilities and Urban Development No. 144 for the year
                2009.<br></br>A consultative council assisting the Association
                of Occupants in managing its functions has been selected from a
                distinguished group of public figures who will help develop the
                Marina Center to remain one of the best tourist centers in Egypt
                on the Mediterranean Sea and in order to facilitate service to
                the owners gentlemen, marina center has been divided into eight
                major sectors.
              </p>
            </div>
          </section>
        </div>

        <section className={styles.sectionTwo}>
          <div className="mb-10">
            <Container fluid px={20}>
              <span className="block text-white text-center text-3xl md:text-6xl lg:text-8xl font-bold leading-tight mb-6 md:mb-[60px]">
                <p className="">
                  {" "}
                  {t("marina")}
                  <br></br>
                  {t("tourism")}
                </p>
              </span>
            </Container>

            <Container fluid px={20}>
              <span className="mt-5 text-xl leading-relaxed text-white">
                <p>
                  Marina Center is located between kilometer 94 - kilometer 105
                  north of the coastal road Alexandria Matrouh and has been
                  fully constructed. Marina Center is located in one of the best
                  costal locations as it has to its west and the city of
                  Al-Alamal, after which there is the famous area of Sidi Abd
                  al-Rahman. The area between 98.5 km and 100 km has been fully
                  delivered to the Egyptian Antiquities Authority as some Roman
                  relics was found there and currently excavations are under way
                  with care in the hope of exploring the ruins of this ancient
                  city, which is said to have already been the Roman port, which
                  exported wheat and grapes to the entire northern coast.
                  <br></br>
                  Marina Center is an integrated tourism project that takes its
                  right path to exploitation and investment through a clear
                  vision and sound guidance in the stages of planning, design,
                  implementation, management, operation, marketing, promotion
                  and revitalization, and the idea of establishing this center
                  aims to install Egyptian and foreign feet on the road of beach
                  tourism and entertainment to the global level<br></br>
                  This resort has been given the term &apos;center&apos; because
                  it is considered the largest touristic gathering located on
                  the northwest coast and exceeds the term &apos;village&apos;
                  and has been called &apos;marina&apos;, which is opposite the
                  word &apos;Marine&apos;, which means port as it is said and
                  mentioned earlier that this area was already the Romanian port
                  for the export of agricultural products to Rome
                </p>
              </span>
            </Container>
          </div>
        </section>
        <div className="container mx-auto">
          <div className="mt-[100px]">
            <div className="text-2xl md:text-6xl lg:text-7xl text-[#3a3a3a] mt-6 mb-11 font-extrabold leading-tight">
              <p>
                {t("textOne")}

                <span> {t("textTwo")} </span>
                <span className={styles.lastSpan}> {t("textThree")}</span>
              </p>
            </div>
          </div>

          <div>
            <div className="flex ">
              <div className={styles.imgOne}>
                <p className="text-xl sm:text-6xl mb-24">{t("marqiaImg")}</p>
              </div>
              <div className={styles.imgTwo}>
                <p className="text-xl sm:text-6xl mb-24">{t("marinaImg")}</p>
              </div>
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
      ...(await serverSideTranslations(context.locale, ["about", "common"])),
    },
  };
};
