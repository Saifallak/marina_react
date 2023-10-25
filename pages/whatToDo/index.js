import React, { useEffect, useState } from "react";
import styles from "@/styles/whatToDo.module.scss";
import img from "@/public/images/whatToDo/daan-evers-tKN1WXrzQ3s-unsplash.webp";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import WhatToDoCard from "@/components/whatToDo/WhatToDoCard";
import { Button, Skeleton } from "@mantine/core";
import { useRouter } from "next/router";
import Ad1 from "@/components/Ad1";
import { getAllBlogs } from "@/components/useApi/dataApi";

const Index = () => {
  const { t } = useTranslation("todo");
  const { locale } = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [Load1, setLoad1] = useState(false);

  useEffect(() => {
    FetchDataOFBlogs();
  }, []);
  const FetchDataOFBlogs = async () => {
    setLoad1(true);
    const Blogs = await getAllBlogs();
    if (!Blogs) console.log(Blogs?.message);
    setBlogs(Blogs);
    setLoad1(false);
  };
  return (
    <>
      <PageComponent styles={styles} title={t("what")} hero={img.src}>
        <section className={[styles.sectionOne + " container mx-auto"]}>
       
          <div className=" px-4 mx-auto sm:px-10 mt-11">
          {Load1 && (
              <div className="loadDiv mt-11" >
                <Skeleton height={300} width={"90%"} radius="8px" />
                <Skeleton height={300} width={"90%"} radius="8px" />
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
          <div className={styles.ad}>
            <Ad1 />
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
      ...(await serverSideTranslations(context.locale, ["todo", "common"])),
    },
  };
};
