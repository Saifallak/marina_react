import { Button } from "@mantine/core";
import React from "react";
import styles from "@/styles/whatHappening.module.scss";
import PageComponent from "@/components/PageComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import img from "@/public/images/whatsHappening/linus-nylund-UCIZh0-OYPw-unsplash.webp";
import WhatToDoCard from "@/components/whatToDo/WhatToDoCard";
import { useRouter } from "next/router";

const Index = ({ blogs }) => {
  const { t } = useTranslation("happening");
  const { locale } = useRouter();

  return (
    <>
      <PageComponent styles={styles} title={t("happening")} hero={img.src}>
        <section className={styles.sectionOne}>
          <div className="container px-4 mx-auto sm:px-10 mt-11">
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
  const blogs = await fetch(
    "https://admin.marina.com.eg/api/data/blogs?type=1"
  ).then((res) => res.json());
  return {
    props: {
      blogs,
      ...(await serverSideTranslations(context.locale, [
        "happening",
        "common",
      ])),
    },
  };
};
