import CategoryGrid from "@/components/Categories/CategoryGrid";
import PageComponent from "@/components/PageComponent";
import styles from "@/styles/categories.module.scss";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Script from "next/script";
import Head from "next/head";
import Ad1 from "@/components/Ad1";


const Index = ({ data, CurrentCatalouge }) => {
  console.log(data);
  const { locale } = useRouter();
  const { t } = useTranslation();

  return ( 
    <>
<Head>



</Head>

    <PageComponent
      styles={styles}
      title={CurrentCatalouge.name[locale]}
      hero={CurrentCatalouge.cover_collection.responsive_urls[0]}
      srcset={CurrentCatalouge.cover_collection.responsive_urls}
    >
      <div
        className={`${styles.category__container} container mx-auto  px-4 sm:px-10 mt-11 flex flex-col`}
      >
        <CategoryGrid items={data} t={t}></CategoryGrid>
        <div className={styles.ad}>

        <Ad1/>
      

     
    </div>


        </div>
     
    </PageComponent>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
export async function getServerSideProps(context) {
  const Catalog_type_id = context.params.id;
  const res = await fetch(
    `https://admin.marina.com.eg/api/data/catalogs?catalog_type_id=${Catalog_type_id}`
  );
  const data = await res.json();

  const res2 = await fetch(
    "https://admin.marina.com.eg/api/data/catalog_types?with_catalogs=1"
  );
  const blogs = await res2.json();

  const CurrentCatalouge = blogs.find((item) => item.id == Catalog_type_id);
  return {
    props: {
      data,
      CurrentCatalouge,
      ...(await serverSideTranslations(context.locale, [
        "whereToGo",
        "common",
      ])),
    },
  };
}
