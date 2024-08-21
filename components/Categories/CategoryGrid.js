import { Button, Grid } from "@mantine/core";
import styles from "@/styles/categories.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Script from "next/script";

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
        width={100}
        height={100}
        className="max-h-[366px] max-w-[60%]"
        srcSet={srcset}
        src={src}
        alt={alt}
      />
    );
  };

  return (
    <Grid className={styles.items}>
      {items.map((item, i) => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpand = () => {
          setIsExpanded(!isExpanded);
        };

        return (
          <div key={i} className={styles.item}>
            <div className="lg:flex md:flex gap-10 lg:ml-[10%]">
              {/* First Set */}
              <div className="border border-gray-500 rounded-3xl p-3 mb-3">
                <h3 className={styles.item__title}>{item.name[locale]}</h3>
                <div className="gap-6">
                  {getBackground(
                    item.img_collection.responsive_urls[0],
                    item.name[locale],
                    item.img_collection.responsive_urls
                  )}
                  <div className="flex flex-col justify-between flex-1">
                    <div
                      id={`content-container-${i}`}
                      className={`${styles.desc} ${isExpanded ? styles.expanded : ''}`}
                      dangerouslySetInnerHTML={createMarkup(item)}
                      onClick={toggleExpand}
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

              {/* Second Set */}
              <div className="border border-gray-500 rounded-3xl p-3 mb-3">
                <h3 className={styles.item__title}>{item.name[locale]}</h3>
                <div className="gap-6">
                  {getBackground(
                    item.img_collection.responsive_urls[0],
                    item.name[locale],
                    item.img_collection.responsive_urls
                  )}
                  <div className="flex flex-col justify-between flex-1">
                    <div
                      className={`${styles.desc} ${isExpanded ? styles.expanded : ''}`}
                      dangerouslySetInnerHTML={createMarkup(item)}
                      onClick={toggleExpand}
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
          </div>
        );
      })}
    </Grid>
  );
};

export default CategoryGrid;
