import CategoryGrid from "@/components/Categories/CategoryGrid";
import PageComponent from "@/components/PageComponent";
import styles from "@/styles/categories.module.scss";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Ad1 from "@/components/Ad1";
import {
  getCatalogType,
  getCurrentCatalouge,
} from "@/components/useApi/dataApi";
import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";

const Index = ({ id }) => {
  const [CurrentCatalouge, setCurrentCatalouge] = useState([]);
  const [data, setData] = useState([]);
  const [Load1, setLoad1] = useState(false);
  const [Load2, setLoad2] = useState(false);
  const { locale } = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    FetchDataOFCurrentCatalouge();
    FetchDataOFCatalogType();
  }, [id]);

  const FetchDataOFCurrentCatalouge = async () => {
    setLoad1(true);
    const CurrentCatalouge = await getCurrentCatalouge();
    if (!CurrentCatalouge) console.log(CurrentCatalouge?.message);
    setLoad1(false);
    setCurrentCatalouge(CurrentCatalouge.find((item) => item.id == id));
  };
  const FetchDataOFCatalogType = async () => {
    setLoad2(true);
    const CatalogType = await getCatalogType(id);
    if (!CatalogType) console.log(CatalogType?.message);
    setLoad2(false);
    setData(CatalogType);
  };
  console.log(CurrentCatalouge);
  return (
    <>
      <Head></Head>
      {CurrentCatalouge.id ? (
        <PageComponent
          styles={styles}
          title={CurrentCatalouge.name[locale]}
          hero={CurrentCatalouge.cover_collection.responsive_urls[0]}
          srcset={CurrentCatalouge.cover_collection.responsive_urls}
        >
          <div
            className={`${styles.category__container} container mx-auto  px-4 sm:px-10 mt-11 flex flex-col`}
          >
            {data.length > 0 ? (
              <CategoryGrid items={data} t={t}></CategoryGrid>
            ) : null}
            <div className={styles.ad}>
              <Ad1 />
            </div>
          </div>
        </PageComponent>
      ) : null}
       {Load1 && (
                  <div className="loadDiv " style={{maxWidth:"95%",width:"1200px",margin:"40px auto 60px"}}>
                    <Skeleton height={150} width={"100%"} radius="8px" />
                    <Skeleton height={150} width={"100%"} radius="8px" />
                    <Skeleton height={150} width={"100%"} radius="8px" />
                    <Skeleton height={150} width={"100%"} radius="8px" />
                  </div>
                )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
export async function getServerSideProps(context) {
  const id = context.params.id;

  return {
    props: {
      id,
      ...(await serverSideTranslations(context.locale, [
        "whereToGo",
        "common",
      ])),
    },
  };
}
