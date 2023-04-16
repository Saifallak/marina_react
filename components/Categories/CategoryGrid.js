import { Button,Grid } from "@mantine/core";
import styles from "@/styles/categories.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const CategoryGrid = ({ items }) => {
  const { locale } = useRouter();

  const btn1 = { ar: "المزيد", en: "more info" };
  const btn2 = { ar: "احجز", en: "RESERVE" };

  function createMarkup(item) {
    return {
      __html: item.desc[locale],
    };
  }
  const getBackground = (src, alt, srcset) => {
    if (!src) return <div className={styles.placeholder__img}></div>;
    return (
      <Image
        width={366}
        height={366}
        className="max-h-[366px]  max-w-[60%]"
        srcSet={srcset}
        src={src}
        alt={alt}
      ></Image>
    );
  };
  return (
    <Grid className={styles.items}>
      {items.map((item, i) => {
        return (
          <div key={i} className={styles.item}>
            <h3 className={styles.item__title}>{`${item.name[locale]}`}</h3>
            <div className="flex gap-6">
              <div className={styles.item__body}>
                {getBackground(
                  item.img_collection.responsive_urls[0],
                  item.name[locale],
                  item.img_collection.responsive_urls
                )}
                <div className="flex flex-col justify-between flex-1">
                  <div
                    className={styles.desc}
                    dangerouslySetInnerHTML={createMarkup(item)}
                  />
                  <div className={styles.buttons}>
                    <Link href={`/whereToGo/catalouge/${item.id}`}>
                      <Button uppercase className={styles.btn1}>
                        {btn1[locale]}
                      </Button>
                    </Link>
                    <a href={`tel:${item.phone}`}>
                      <Button uppercase className={styles.btn2}>
                        {btn2[locale]}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Grid>
  );
};

export default CategoryGrid;
