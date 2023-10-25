import { Button, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "@/styles/blog.module.scss";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Ad2 from "@/components/Ad2";
import { getAllBlogs, getBlogsDetails } from "@/components/useApi/dataApi";

const Index = ({ id }) => {
  const { locale } = useRouter();
  const { t } = useTranslation("blog");
  const [blogs, setBlogs] = useState([]);
  const [data, setdata] = useState([]);
  const [Load1, setLoad1] = useState(false);
  const [Load2, setLoad2] = useState(false);
  const SameType = blogs.filter((item) => item.type == data.type);

  function createMarkup(item) {
    return {
      __html: item.content[locale],
    };
  }

  useEffect(() => {
    FetchDataOFBlogs();
    FetchDataOFBlogsDetails();
  }, [id]);
  const FetchDataOFBlogs = async () => {
    setLoad1(true);
    const Blogs = await getAllBlogs();
    if (!Blogs) console.log(Blogs?.message);
    setLoad1(false);
    setBlogs(Blogs);
  };
  const FetchDataOFBlogsDetails = async () => {
    setLoad2(true);
    const Blogs = await getBlogsDetails(id);
    if (!Blogs) console.log(Blogs?.message);
    setLoad2(false);
    setdata(Blogs);
  };
  return (
    <>
    
      {data.id ? (
        <PageComponent
          title={data?.title[locale]}
          hero={data?.img_collection.responsive_urls[0]}
        >
          <div className="container mx-auto">
            <section
              className={styles.sectionOne}
              dangerouslySetInnerHTML={createMarkup(data)}
            />

            <section className={styles.sectionTwo}>
              <div>
                <span className={styles.headerOne}>
                  <p> {t("headerTwo")}</p>
                </span>
                {Load1 && (
                  <div className="loadDiv mt-11">
                    <Skeleton height={90} width={"20%"} radius="8px" />
                    <Skeleton height={200} width={"20%"} radius="8px" />
                    <Skeleton height={200} width={"20%"} radius="8px" />
                    <Skeleton height={200} width={"20%"} radius="8px" />
                    <Skeleton height={200} width={"20%"} radius="8px" />
                    <Skeleton height={200} width={"20%"} radius="8px" />
                    <Skeleton height={200} width={"20%"} radius="8px" />
                  </div>
                )}
                <div className="container flex-wrap mx-auto p-[10px] flex justify-center gap-2">
                  {SameType.filter((item) => item.id !== data.id).map(
                    (item, i) => {
                      return (
                        <Link
                          key={i}
                          href={`/whatToDo/${item.id}`}
                          className={styles.linkBlog}
                        >
                          <Image
                            className={styles.cardBlog}
                            src={item.img_collection.responsive_urls[0]}
                            width={"100"}
                            height={"100"}
                            srcSet={item.img_collection.responsive_urls}
                            alt={item.title[locale]}
                          />
                          <p>{item.title[locale]}</p>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            </section>

            <div className={styles.ViewMore}>
              <Link href="/whatToDo">
                <Button className={styles.ViewMoreButton}>
                  {t("viewMoreButton")}
                </Button>
              </Link>
            </div>
          </div>
          <Ad2 />
        </PageComponent>
      ) : null}
      {Load2 && (
                  <div className="loadDiv mt-11" style={{flexDirection:"column",marginTop:"100px",alignItems:"flex-end",margin:"100px auto 60px",maxWidth:"1400px",width:"96%"}}>
                    <Skeleton height={90} width={"100%"} radius="8px" />
                    <Skeleton height={90} width={"80%"} radius="8px" />
                    <Skeleton height={90} width={"60%"} radius="8px" />
                    <Skeleton height={90} width={"30%"} radius="8px" />

                  </div>
                )}
    </>
  );
};

export default Index;
export async function getServerSideProps(context) {
  const id = context.params.id;
  return {
    props: {
      id,
      ...(await serverSideTranslations(context.locale, ["blog", "common"])),
    },
  };
}
