import PageComponent from "@/components/PageComponent";
import WhereToGoCard from "@/components/whereToGo/WhereToGoCard";
import styles from "@/styles/whereToGo.module.scss";
import { Grid, Skeleton } from "@mantine/core";
import img from "../../public/images/whereToGo/dan-gold-E6HjQaB7UEA-unsplash.webp";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCatalogWith } from "@/components/useApi/dataApi";
const { Col } = Grid;

const Index = () => {
  const { locale } = useRouter();
  const [Catalog, setCatalog] = useState([]);
  const [Load1, setLoad1] = useState(false);
  const { t } = useTranslation("whereToGo");
  useEffect(() => {
    FetchDataOFCatalogWith();
  }, []);
  const FetchDataOFCatalogWith = async () => {
    setLoad1(true);
    const Catalog = await getCatalogWith();
    if (!Catalog) console.log(Catalog?.message);
    setLoad1(false);
    console.log('====================================');
    console.log(Catalog);
    console.log('====================================');
    setCatalog(Catalog);
  };
  return (
    <PageComponent styles={styles} title={t("whereToGo")} hero={img.src}>
      <div className="container mx-auto px-4 sm:px-10 mt-[100px]">
        {Load1 && (
          <div
            className="loadDiv mt-11"
            style={{
              flexDirection: "column",
              marginTop: "100px",
              alignItems: "flex-end",
            }}
          >
            <Skeleton height={300} width={"100%"} radius="8px" />
            <Skeleton height={300} width={"100%"} radius="8px" />
            <Skeleton height={300} width={"100%"} radius="8px" />
            <Skeleton height={300} width={"100%"} radius="8px" />
          </div>
        )}
        {Catalog.length > 0
          ? Catalog.map((row, i) => {
              return row.catalogs.length ? (
                <div key={i} className="flex flex-col mb-[100px]">
                  <h2
                    key={i}
                    className="mb-2 text-2xl font-extrabold md:text-7xl md:mb-10"
                  >
                    {row.name[locale]}
                  </h2>

                  <div className="flex flex-wrap gap-3 md:gap-6">
                    {row.catalogs.slice(0, 3).map((item, i) => {
                      return (
                        <WhereToGoCard
                          key={i}
                          link={`/whereToGo/catalouge/${item.id}`}
                          image={item.img_collection.responsive_urls[0]}
                          t={t}
                        />
                      );
                    })}

                    <WhereToGoCard link={`/whereToGo/${row.id}`} image="" />
                  </div>
                </div>
              ) : null;
            })
          : null}
      </div>
    </PageComponent>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "whereToGo",
        "common",
      ])),
    },
  };
};
