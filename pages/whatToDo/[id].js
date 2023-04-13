import { Button, Container, Grid } from '@mantine/core';
import React from 'react';
import styles from '@/styles/blog.module.scss';
import PageComponent from '@/components/PageComponent';
import img from '@/public/images/blog/frank-mckenna-eXHeq48Z-Q4-unsplash.jpg';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Index = ({data,blogs}) => {
const {locale} =useRouter()
 const { t } = useTranslation('blog');
 const SameType = blogs.filter(item => item.type == data.type);

 function createMarkup(item) {
  return {
    __html: item.content[locale],
  };
}
  return (
    <>
      <PageComponent styles={styles} title={data.title[locale]} hero={data.img_collection.responsive_urls[0]}>
        <div className="container mx-auto">
         
<section className={styles.sectionOne} dangerouslySetInnerHTML={createMarkup(data)}/>


          <section className={styles.sectionTwo}>
            <div>
              <span className={styles.headerOne}>
                <p> {t('headerTwo')}</p>
              </span>
              <div className="container flex-wrap mx-auto p-[10px] flex justify-center gap-2">
                {
                  SameType.filter(item => item.id !== data.id).map((item,i)=>{
                    return(
                      <Link key={i} href={`/whatToDo/${item.id}`}>
                  
                    <Image className={styles.cardBlog} src={item.img_collection.responsive_urls[0]} width={'100'} height={'100'} srcSet={item.img_collection.responsive_urls}  alt={item.title[locale]}/>
                  
                </Link>
                    )
                  })
                }
               
              </div>
            </div>
          </section>

          <div className={styles.ViewMore}>
            <Link href="/whatToDo">
              <Button className={styles.ViewMoreButton}>
              {t('viewMoreButton')}
              </Button>
            </Link>
          </div>
        </div>
      </PageComponent>
    </>
  );
};

export default Index;


export async function getStaticPaths({locales}) {
  const res = await fetch('https://admin.marina.com.eg/api/data/blogs')
  const blogs = await res.json()



  const paths = []
  blogs.map((element) => {
    return locales.map((locale) => {
      return paths.push({
        params: { id: `${element.id}` },
        locale,
      })
    })
  })
  return { paths, fallback: false };
}




export async function getServerSideProps   (context)  {
  const blogs = await fetch('https://admin.marina.com.eg/api/data/blogs').then(
    (res) => res.json()
  );
  const url = new URL(
    `https://admin.marina.com.eg/api/data/blog_details?blog_id=${context.params.id}`
);
  const data = await fetch(
    url
  ).then((res) => res.json());
  
  return {
    props: {
      data,
      blogs,
      ...(await serverSideTranslations(context.locale, ['blog', 'common'])),
    }
  };
};
