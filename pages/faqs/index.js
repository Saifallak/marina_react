import Head from "next/head";
import styles from "@/styles/information.module.scss";

import React, { useEffect } from "react";
import { Accordion, Skeleton } from "@mantine/core";
import { getFAQ } from "../../components/useApi/dataApi";
import Navbar from "../../components/layouts/Navbar/index";
import img from "@/public/images/complaints2.jpg";
import icon from "../../public/Icon.png";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ title }) {


  const { locale } = useRouter();
  const [Faq, setFAQ] = useState([]);
  const [Load1, setLoad1] = useState(false);
  useEffect(() => {
    FetchDataFAQ();
  }, []);
  const FetchDataFAQ = async () => {
    setLoad1(true);
    const FAQ = await getFAQ();
    if (!FAQ) console.log(FAQ?.message);
    console.log(FAQ);
    setFAQ(FAQ);
    setLoad1(false);
  };
  function createMarkup(item) {
    return {
      __html: locale === "en" ? item.en : item.ar,
    };
  }

  return (
    <>
      <Head>
        <title>Marina</title>
        <meta name="description" content="Marina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
      </Head>
      <Navbar />
      <section className={styles.home}>
        <img
          className={" loaded"}
          src={img.src}
          alt="sea beach"
          width={100}
          height={100}
          style={{ minHeight: "44vh", height: "100%", width: "100%" }}
        />

      </section>
      <section className={styles.questions}>
      {Load1 && (
        <div className="loadDiv" style={{ marginTop: "50px" }}>
          <Skeleton height={300} width={"90%"} radius="8px" />
          <Skeleton height={300} width={"90%"} radius="8px" />
          <Skeleton height={300} width={"90%"} radius="8px" />
        </div>
      )}
      {Faq?.length > 0 ? (
        <>
          <div
            className={`container questionsDiv mx-auto max-w-[2000px]  md:mt-[70px] mt-[40px]`}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              {title}
            </h2>
            <Accordion className={styles.Accordion5}>
              {Faq.map((item, i) => {
                return (
                  <Accordion.Item key={i} value={item.question[locale] + i}>
                    <Accordion.Control className={styles.acc}>
                      {item.question[locale]}
                    </Accordion.Control>
                    <Accordion.Panel  >
                      <div dangerouslySetInnerHTML={createMarkup(item.answer)} />
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        </>
      ) : null}
    </section>
  

      
    </>
  );
}
