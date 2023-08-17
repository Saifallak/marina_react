/* eslint-disable @next/next/no-img-element */
import PageComponent from "@/components/PageComponent";
import React from "react";
import styles from "@/styles/destination.module.scss";
import styles2 from "@/styles/blog.module.scss";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Ad1 from "@/components/Ad1";
import Ad2 from "@/components/Ad2";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Product = ({ data, Catalog }) => {
  const btn2 = { ar: "احجز", en: "RESERVE" };
  
  const SameType = Catalog.filter((item) => item.id == data.catalog_type_id);
  const { locale } = useRouter();
  const { t } = useTranslation("blog");
  function createMarkup(item) {
    return {
      __html: locale === "en" ? item.desc.en : item.desc.ar,
    };
  }

  return (
    <>
      <PageComponent
        styles={styles}
        title={locale === "en" ? data.name.en : data.name.ar}
        hero={data.cover_collection.responsive_urls[0]}
      >
        <div className="container px-4 mx-auto sm:px-10 mt-11 flex  flex-col">
          <div className={styles.page__content}>
            <h2>A MATCH MADE IN HEAVEAN</h2>
            <div className={styles.gallery__nav}>
              <img
                className={styles.img}
                src={data.cover_collection.responsive_urls[1]}
                alt="Gallery"
              ></img>
              <ul className={styles.gallery__switcher}>
                {data.cover_collection.responsive_urls.map((item, i) => {
                  return (
                    <li key={i}>
                      {(
                        <Image
                          // onClick={(e) => setSrc(e.target.src)}
                          className={styles.img}
                          src={item}
                          alt="Gallery Item"
                          width={70}
                          height={70}
                        />
                      ) || <Skeleton />}
                    </li>
                  );
                })}
              </ul>
            </div>
            <p dangerouslySetInnerHTML={createMarkup(data)} />

            <a href={`tel:${data.phone}`} uppercase className={styles.btn}>
              {btn2[locale]}
            </a>
          </div>
          <section className={styles2.sectionTwo}>
          <div>
            <span className={styles2.headerOne}>
              <p> {t("headerThree")}</p>
            </span>
            <div className="container flex-wrap mx-auto p-[10px] flex justify-center gap-2">
              {SameType[0].catalogs.filter((item) => item.id !== data.id).map((item, i) => {
                return (
                  <Link
                    key={i}
                    href={`/whereToGo/catalouge/${item.id}`}
                    className={styles2.linkBlog}
                  >
                    <Image
                      className={styles2.cardBlog}
                      src={item.img_collection.responsive_urls[0]}
                      width={"100"}
                      height={"100"}
                      srcSet={item.img_collection.responsive_urls}
                      alt={item.name[locale]}
                    />
                    <p>{item.name[locale]}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          </section>
         

          <div className=" min-w-[300px] xl:my-auto  my-6 flex-1 xl:flex-[0px]">
            <Ad1 />
          </div>
        </div>
      </PageComponent>
      <div className=" w-[100%]   mt-6 ">
        <Ad2 />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const Catalog = await fetch(
    "https://admin.marina.com.eg/api/data/catalog_types?with_catalogs=1"
  ).then((res) => res.json());

  const res = await fetch(
    `https://admin.marina.com.eg/api/data/catalogs/details?id=${id}`
  );
  const data = await res.json();
  return {
    props: {
      data,
      Catalog,
      ...(await serverSideTranslations(context.locale, ["blog", "common"])),
    },
  };
};
