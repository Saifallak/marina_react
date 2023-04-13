import PageComponent from "@/components/PageComponent";
import WhereToGoCard from "@/components/whereToGo/WhereToGoCard";
import styles from "@/styles/whereToGo.module.scss";
import { Grid } from "@mantine/core";
import img from "../../public/images/whereToGo/dan-gold-E6HjQaB7UEA-unsplash.jpg";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const { Col } = Grid;

const Index = ({ Catalog }) => {
const {locale} =useRouter()
  
  

  
 const { t } = useTranslation("whereToGo");
  return (
    <PageComponent styles={styles} title={t("whereToGo")} hero={img.src}>
      <div className="container mx-auto px-4 sm:px-10 mt-[100px]">
        {Catalog.map((row, i) => {
          return (
            row.catalogs.length ? 
            <div key={i} className="flex flex-col mb-[100px]">
            <h2
              key={i}
              className="mb-2 text-2xl font-extrabold md:text-7xl md:mb-10"
            >
              {row.name[locale]}
            </h2>
            
            <div className="flex flex-wrap gap-3 md:gap-6">
              {row.catalogs.slice(0, 3).map((item, i) => {
                  return (
                    <WhereToGoCard
                      key={i}
                      link={`/whereToGo/catalouge/${item.id}`}
                      image={item.img_collection.responsive_urls[0]}
                      t={t}
                    />
                  );
                })}
              {/* <WhereToGoCard
               
                image="/images/whereToGo/dan-gold-E6HjQaB7UEA-unsplash.jpg"
              />
              <WhereToGoCard
                link="/catalouge"
                image="/images/whereToGo/dan-gold-E6HjQaB7UEA-unsplash.jpg"
              />
              <WhereToGoCard
                link="/catalouge"
                image="/images/whereToGo/dan-gold-E6HjQaB7UEA-unsplash.jpg"
              /> */}
              <WhereToGoCard link={`/whereToGo/${row.id}`} image="" />
            </div>
          </div> :null
            
          );
        })}
      </div>
    </PageComponent>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export const getServerSideProps = async (context) => {
  const Catalog = await fetch(
    "https://admin.marina.com.eg/api/data/catalog_types?with_catalogs=1"
  ).then((res) => res.json());
  return {
    props: {
      Catalog,
      ...(await serverSideTranslations(context.locale, ['whereToGo', 'common'])),
    },
  };
};
