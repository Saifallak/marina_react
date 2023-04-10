import { Button, Container, Grid } from '@mantine/core';
import React from 'react';
import styles from '@/styles/blog.module.scss';
import PageComponent from '@/components/PageComponent';
import img from '@/public/Images/blog/frank-mckenna-eXHeq48Z-Q4-unsplash.jpg';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
                  SameType.filter(item => item.id !== data.id).map((item)=>{
                    return(
                      <Link href={`/whatToDo/${item.id}`}>
                  
                    <img className={styles.cardBlog} src={item.img_collection.responsive_urls[0]}  alt={item.title[locale]}/>
                  
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



export async function getStaticPaths() {
  const res = await fetch('https://admin.marina.com.eg/api/data/blogs')
  const blogs = await res.json()

  const paths = blogs.map((blog) => ({
    params: { id: `${blog.id}` },
  }))

  
  return { paths, fallback: 'blocking' }
}



export const getStaticProps = async (context) => {

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
      data: data,
      blogs,
      ...(await serverSideTranslations(context.locale, ['blog', 'common'])),
    },
  };
};
