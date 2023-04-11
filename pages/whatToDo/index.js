import React, { useState } from 'react';
import styles from '@/styles/whatToDo.module.scss';
import img from '@/public/Images/whatToDo/daan-evers-tKN1WXrzQ3s-unsplash.jpg';
import PageComponent from '@/components/PageComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import WhatToDoCard from '@/components/whatToDo/WhatToDoCard';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';

const Index = ({ blogs }) => {
 const { t } = useTranslation('todo');
 const {locale} =useRouter()
 const [NumberSlice ,setNumberSlice] = useState(4)
  return (
    <>
      <PageComponent styles={styles} title={t('what')} hero={img.src}>
        <section className={styles.sectionOne}>
          <div className="container px-4 mx-auto sm:px-10 mt-11">
            {blogs.slice(0, NumberSlice).map((blog, index) => (
              <WhatToDoCard
                key={index}
                id={blog.id}
                image={blog.img_collection.responsive_urls[0]}
                titleOne={blog.title[locale]}
              t={t}
               
              />
            ))}
           
             
          <Button
            variant='default'
            className='uppercase bg-black text-white border-none text-sm lg:text-xl h-[40px] lg:h-[60px] px-10 rounded-3xl bottom-1 hover:bg-black block m-auto mt-16 sm:mt-28'
            onClick={()=> NumberSlice < blogs.length ?  setNumberSlice(NumberSlice + 3) : null }
           
          >
          {t('loadMore')}
          </Button>
          
          </div>
        </section>
      </PageComponent>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const blogs = await fetch('https://admin.marina.com.eg/api/data/blogs').then(
    (res) => res.json()
  );
  return {
    props: {
      blogs,
      ...(await serverSideTranslations(context.locale, ['todo', 'common'])),
    },
  };
};