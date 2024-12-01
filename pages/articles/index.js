"use client";
import Head from "next/head";
import Image from "next/image";
import HomeCard from "@/components/home/HomeCard";
import styles from "@/styles/Home.module.scss";
import Logo from "../.././public/images/navbar/logo.png";
import PageComponent from "@/components/PageComponent";
import { Button, Container, Grid, Skeleton } from "@mantine/core";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "../../components/layouts/Navbar/index";
import img from "@/public/images/home/hero.webp";
import icon from "../../public/Icon.png";
import { useEffect, useState } from "react";
import { getBlogs, getCatalog } from "@/components/useApi/dataApi";
import Questions from "@/components/Questions";
const { Col } = Grid;
export default function Home() {
  const { t } = useTranslation("home");
  const { locale } = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [Load1, setLoad1] = useState(false);
  const [Load2, setLoad2] = useState(false);
  useEffect(() => {
    FetchDataOFBlogs();
    FetchDataOFCatalog();
  }, []);
  const FetchDataOFBlogs = async () => {
    setLoad1(true);
    const Blogs = await getBlogs();
    if (!Blogs) console.log(Blogs?.message);
    console.log(Blogs.data);
    setBlogs(Blogs.data);
    setLoad1(false);
  };
  const FetchDataOFCatalog = async () => {
    setLoad2(true);
    const Catalog = await getCatalog();
    if (!Catalog) console.log(Catalog?.message);
    setCatalog(Catalog);
    setLoad2(false);
  };
  return (
    <>
      <Head>
        <title>Artics</title>
        <meta name="description" content="Marina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
      </Head>
      <Navbar />
      <main>
      <PageComponent styles={styles} title={t("articles")}  hero={img.src}>

          <section className={styles.looking__for}>

            <Container fluid px={20}>
              <h2 className="text-[#3a3a3a] text-2xl sm:text-6xl uppercase mb-6">
                {t("discoverDistance")}
              </h2>
            {Load2&&<div className="loadDiv">
                <Skeleton height={300} width={"22%"} radius="8px" />
                <Skeleton height={300} width={"22%"} radius="8px" />
                <Skeleton height={300} width={"22%"} radius="8px" />
                <Skeleton height={300} width={"22%"} radius="8px" />
                <Skeleton height={300} width={"22%"} radius="8px" />
                <Skeleton height={300} width={"22%"} radius="8px" />
              </div>}
              {catalog.length > 0 ? (
                <Grid className={styles.grid__container} columns={10}>
                  {catalog.map((item) => {
                    return (
                      <Col span={2} key={item.id} className={styles.grid__grid}>
                        <Link href={`/whereToGo/${item.id}`}>
                          <div className={`${styles.grid__item} cursor-pointer `}>
                            {(
                              <Image
                                className={styles.imgLook}
                                src={item.img_collection.responsive_urls[0]}
                                fill
                                srcSet={item.img_collection.responsive_urls}
                                loading="lazy"
                                decoding="async"
                                sizes="100%"
                                alt={item.name[locale].toLowerCase()}
                              />
                            ) || <Skeleton />}
                            <h3>{item.name[locale]}</h3>
                          </div>
                        </Link>
                      </Col>
                    );
                  })}
                </Grid>
              ) : null}
              {/*<div className={styles.see__more}>
                <Link href={"/whatToDo"}>
                  <Button uppercase className={styles.btn}>
                    {t("exploreMoreBtn")}
                  </Button>
                </Link>
              </div>*/}
            </Container>
          </section>

          
          <Container fluid px={20} dir={locale === "ar" ? "rtl" : "ltr"}>
            <section>
              {Load1 && (
                <div className="loadDiv" style={{ marginTop: "50px" }}>
                  <Skeleton height={300} width={"90%"} radius="8px" />
                  <Skeleton height={300} width={"90%"} radius="8px" />
                  <Skeleton height={300} width={"90%"} radius="8px" />
                </div>
              )}

          {blogs?.length > 0 && (
            <>
              <h1 className="text-2xl font-bold mt-8">
                {t("articles")}
              </h1>

              {blogs.reduce((acc, item, index) => {
                const chunkIndex = Math.floor(index / 4); 
                if (!acc[chunkIndex]) acc[chunkIndex] = [];
                acc[chunkIndex].push(item);
                return acc;
              }, []).map((chunk, chunkIndex) => (
                <div key={chunkIndex}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chunk.map((item, i) => (
                      <HomeCard
                        key={i}
                        title={item.title[locale]}
                        image={item.img_collection.responsive_urls}
                        id={item.id}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <Link 
                href="/articles" 
                className={`flex items-center justify-center`}
              >
                <Button 
                  size="xl" 
                  uppercase 
                  className={`mt-10 text-white rounded-lg px-6 py-3 ${styles.btn}`}
                >
                  {t("knowmore")}
                </Button>
              </Link>
            </>
          )}


            </section>
          </Container>
        </PageComponent>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["home", "common"])),
    },
  };
}
