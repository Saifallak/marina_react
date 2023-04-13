/* eslint-disable @next/next/no-img-element */
import PageComponent from '@/components/PageComponent';
import React from 'react';
import styles from '@/styles/destination.module.scss';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Product = ({ data}) => {
  const btn2 = {ar:"احجز",en:"RESERVE"}

  const {locale} = useRouter()
  function createMarkup(item) {
    return {
      __html: locale === 'en' ? item.desc.en : item.desc.ar,
    };
  }

  return (
    <PageComponent
      styles={styles}
      title={locale === 'en' ? data.name.en : data.name.ar}
      hero={data.cover_collection.responsive_urls[0]}
    >
      <div className="container px-4 mx-auto sm:px-10 mt-11">
        <div className={styles.page__content}>
          <h2>A MATCH MADE IN HEAVEAN</h2>
          <div className={styles.gallery__nav}>
            <img
              className={styles.img}
              src={data.cover_collection.responsive_urls[1]}
              alt="Gallery"
            ></img>
            <ul className={styles.gallery__switcher}>
              {data.cover_collection.responsive_urls.map((item, i) => {
                return (
                  <li key={i}>
                    {(
                      <Image
                        // onClick={(e) => setSrc(e.target.src)}
                        className={styles.img}
                        src={item}
                        alt="Gallery Item"
                        width={70}
                        height={70}
                      />
                    ) || <Skeleton />}
                  </li>
                );
              })}
            </ul>
          </div>
          <p dangerouslySetInnerHTML={createMarkup(data)} />
         
          <a  href={`tel:${data.phone}`} uppercase className={styles.btn}>
          {btn2[locale]}
          </a>
          
        </div>
      </div>
    </PageComponent>
  );
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    `https://admin.marina.com.eg/api/data/catalogs/details?id=${id}`
  );
  const data = await res.json();
  return {
    props: {
      
      data,
    },
  };
};
