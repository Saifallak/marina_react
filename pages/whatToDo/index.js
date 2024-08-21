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
import { getAllBlogs, getBlogsType } from "@/components/useApi/dataApi";
import ProgressiveImage from "react-progressive-graceful-image";


const Index = () => {
  const { t } = useTranslation("todo");
  const { locale } = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [Load1, setLoad1] = useState(false);

  useEffect(() => {
    FetchDataOFBlogs();
    FetchDataOFBlogs2();
  }, []);
  const FetchDataOFBlogs = async () => {
    setLoad1(true);
    const Blogs = await getAllBlogs();
    if (!Blogs) console.log(Blogs?.message);
    setBlogs(Blogs);
    setLoad1(false);
  };
  const [blogs2, setBlogs2] = useState([]);
  const [Load2, setLoad2] = useState(false);

  const FetchDataOFBlogs2 = async () => {
    setLoad2(true);
    const Blogs2 = await getBlogsType();
    if (!Blogs2) console.log(Blogs2?.message);
    setBlogs2(Blogs2.data);
    setLoad2(false);
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

            {/* <Button
              variant="default"
              className="uppercase bg-black text-white border-none text-sm lg:text-xl h-[40px] lg:h-[60px] px-10 rounded-3xl bottom-1 hover:bg-black block m-auto mt-16 sm:mt-28"
            >
              {t("loadMore")}
            </Button> */}
          </div>
          <div className={styles.ad}>
            <Ad1 />
          </div>
        </section>
   
        <section 
        className="page__header md:!max-h-[500px] !max-h-[300px] mt-12 "
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
      
        <div className="flex-col page__hero__content">
          <h1 className="page__title">{t("happening2")}</h1>
          
        </div>
         </section>
          <section className={styles.sectionOne}>
            <div className="container px-4 mx-auto sm:px-10 mt-11">
              {Load2 && (
                <div className="loadDiv">
                  <Skeleton height={300} width={"90%"} radius="8px" />
                  <Skeleton height={300} width={"90%"} radius="8px" />
                  <Skeleton height={300} width={"90%"} radius="8px" />
                </div>
              )}
              {blogs2.map((blog, index) => (
                <WhatToDoCard
                  key={index}
                  id={blog.id}
                  image={blog.img_collection.responsive_urls}
                  titleOne={blog.title[locale]}
                  t={t}
                />
              ))}
{/*   
              <Button
                variant="default"
                className="uppercase bg-black text-white border-none text-sm lg:text-xl h-[40px] lg:h-[60px] px-10 rounded-3xl bottom-1 hover:bg-black block m-auto mt-16 sm:mt-28"
              >
                {t("loadMore")}
              </Button> */}
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
