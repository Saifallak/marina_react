"use client";
import Head from "next/head";
import Image from "next/image";
import HomeCard from "@/components/home/HomeCard";
import styles from "@/styles/Home.module.scss";
import Logo from ".././public/images/navbar/logo.png";
import { Button, Container, Grid, Skeleton } from "@mantine/core";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Navbar from "../components/layouts/Navbar/index";
import img from "@/public/images/home/hero.webp";
import icon from "../public/Icon.png";
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
        <title>Marina</title>
        <meta name="description" content="Marina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
      </Head>
      <Navbar />
      <main>
        <section className={styles.home}>
          <img
            className={" loaded"}
            src={img.src}
            alt="sea beach"
            width={100}
            height={100}
            style={{ minHeight: "300px", height: "100%", width: "100%" }}
          />

          <Container className={styles.home__container} fluid>
            <div className={styles.home__title}>
              <p className={styles.discover}>{t("discover")}</p>
              <h1 className="mt-4 text-2xl leading-tight sm:text-4xl lg:text-6xl">
                {t("textOneHeader")} <br className="bbr" /> {t("textTwoHeader")}{" "}
                <br className="bbr" />
                {t("textThreeHeader")}
                {t("yourTrue")}
              </h1>
              <p className="text-lg">{t("discriptionHeader")}</p>
              <Link href={"/whereToGo"}>
                <Button uppercase className={styles.header__btn}>
                  {t("distinationBtn")}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
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

        
          <Container fluid px={20}>
            <section>
            {Load1&&<div className="loadDiv" style={{marginTop:"50px"}}>
              <Skeleton height={300} width={"90%"} radius="8px" />
              <Skeleton height={300} width={"90%"} radius="8px" />
              <Skeleton height={300} width={"90%"} radius="8px" />
              
            </div>}
            {blogs.length > 0 ? (
              blogs.map((item, i) => (
                <HomeCard
                  key={i}
                  title={item.title[locale]}
                  image={item.img_collection.responsive_urls}
                  id={item.id}
                  t={t}
                  reverse={i % 2 == 0 ? "" : "true"}
                />
              ))
              ) : null}
            </section>
          </Container>
       

        <Container fluid px={20}>
          <div className={styles.know__more}>
            <h2 className="text-2xl sm:text-5xl font-extrabold mb-6">
              {t("wannaKnowMore")}
            </h2>
            <Link href="/about">
              <Button size="xl" uppercase className={styles.btn}>
                {t("readNowBtn")}
              </Button>
            </Link>
          </div>
        </Container>
        <Questions title={t("faq")}/>
       
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
