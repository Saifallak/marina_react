import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import PageComponent from "@/components/PageComponent";
import { Button, Container, Grid, Skeleton } from "@mantine/core";
import HomeCard from "@/components/home/HomeCard";
import { useTranslation } from "next-i18next";
import { getBlogByFilter } from "@/components/useApi/dataApi";
import icon from "../../public/Icon.png";
import styles from "@/styles/Home.module.scss";
import img from "@/public/images/home/hero.webp";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const NewsFilterPage = () => {
    const { t } = useTranslation("home");
    const { locale } = useRouter();
    const router = useRouter();
    const { id } = router.query;
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchFilteredBlogs = async () => {
                setLoading(true);
                const blogs = await getBlogByFilter(id)
                if (!blogs) console.log(blogs?.message);
                setFilteredBlogs(blogs)
                setLoading(false)
            };
            fetchFilteredBlogs();
        }
    }, [id]);

    return (
        <>
        <Head>
        <title>Articles</title>
        <meta name="description" content="Marina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
        </Head>
        <PageComponent styles={styles} title={t("articles")}  hero={img.src}>

        <Container fluid px={20} dir={locale === "ar" ? "rtl" : "ltr"}>
            {loading ? (
                <div className="loadDiv" style={{ marginTop: "50px" }}>
                    <Skeleton height={300} width={"90%"} radius="8px" />
                    <Skeleton height={300} width={"90%"} radius="8px" />
                </div>
            ) : filteredBlogs.length > 0 ? (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                        {filteredBlogs.map((item) => (
                            <HomeCard
                                key={item.id}
                                title={item.title['ar']}
                                image={item.img_collection.responsive_urls}
                                id={item.id}
                                t={t}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>No results found</p>
            )}
        </Container>
        </PageComponent>

        </>
    );
};

export default NewsFilterPage;
export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["home", "common"])),
    },
  };
}