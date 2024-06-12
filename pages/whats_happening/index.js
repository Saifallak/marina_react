import { Button, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "@/styles/whatHappening.module.scss";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import img from "@/public/images/whatsHappening/linus-nylund-UCIZh0-OYPw-unsplash.webp";
import WhatToDoCard from "@/components/whatToDo/WhatToDoCard";
import { useRouter } from "next/router";
import { getBlogsType } from "@/components/useApi/dataApi";
import ProgressiveImage from "react-progressive-graceful-image";

const Index = () => {
  const { t } = useTranslation("happening");
  const { locale } = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [Load1, setLoad1] = useState(false);

  useEffect(() => {
    FetchDataOFBlogs();
  }, []);
  const FetchDataOFBlogs = async () => {
    setLoad1(true);
    const Blogs = await getBlogsType();
    if (!Blogs) console.log(Blogs?.message);
    setBlogs(Blogs.data);
    setLoad1(false);
  };
  return (
    <>
      <PageComponent styles={styles} title={t("happening")} hero={img.src}>
      <section
        className="page__header md:!max-h-[500px] !max-h-[300px] "
        style={{ maxHeight: "100vh", overflow: "hidden" }}
      >
        <ProgressiveImage src={img.src} placeholder="loading">
          {(src, loading) => (
            <img
              className={`image${loading ? " loading" : " loaded"}`}
              src={src}
              alt="sea beach"
              width="100%"
              height="100%"
            />
          )}
        </ProgressiveImage>
       { props.over ? null: <div className="page__overlay"></div>}
        <div className="flex-col page__hero__content">
          <h1 className="page__title">{t("happening")}</h1>
          
        </div>
      </section>
        <section className={styles.sectionOne}>
          <div className="container px-4 mx-auto sm:px-10 mt-11">
            {Load1 && (
              <div className="loadDiv">
                <Skeleton height={300} width={"90%"} radius="8px" />
                <Skeleton height={300} width={"90%"} radius="8px" />
                <Skeleton height={300} width={"90%"} radius="8px" />
              </div>
            )}
            {blogs.map((blog, index) => (
              <WhatToDoCard
                key={index}
                id={blog.id}
                image={blog.img_collection.responsive_urls}
                titleOne={blog.title[locale]}
                t={t}
              />
            ))}

            <Button
              variant="default"
              className="uppercase bg-black text-white border-none text-sm lg:text-xl h-[40px] lg:h-[60px] px-10 rounded-3xl bottom-1 hover:bg-black block m-auto mt-16 sm:mt-28"
            >
              {t("loadMore")}
            </Button>
          </div>
        </section>
      </PageComponent>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "happening",
        "common",
      ])),
    },
  };
};
