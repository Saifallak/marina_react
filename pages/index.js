import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeCard from '@/components/home/HomeCard'
import styles from "@/styles/Home.module.scss";
import Logo from '.././public/images/navbar/logo.svg';
import { Button, Container, Grid } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ProgressiveImage from 'react-progressive-graceful-image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const { Col } = Grid;
export default function Home({ catalog ,blogs }) {
  const { t } = useTranslation('home');
  const {locale} =useRouter()
 console.log('====================================');
 console.log(catalog);
 console.log('====================================');
  
  return (
    <>
      <Head>
        <title>Marina</title>
        <meta name="description" content="Marina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
      <section className={styles.home} >
      <ProgressiveImage src="/Images/home/hero.jpg" placeholder="loading">
      {(src, loading) => (
        <img
             className={`image${loading ? ' loading' : ' loaded'}`}
              src={src}
              alt="sea beach"
              width="100%"
              height="100%"
              style={{ minHeight: '44vh' ,height:"100%" }}
            />
      )}
      
      </ProgressiveImage>
          
           
          
       

        <Container className={styles.home__container} fluid px={20}>
          <div className={styles.home__title}>
          <p className={styles.discover}>{t('discover')}</p>
            <h1 className="mt-4 text-2xl leading-tight sm:text-4xl lg:text-6xl">
              {t('textOneHeader')} <br className='bbr' /> {t('textTwoHeader')} <br className='bbr'/>
              {t('textThreeHeader')}
              {t('yourTrue')}
            </h1>
            <p className="text-lg">{t('discriptionHeader')}</p>
            <Link href={'/whereToGo'}>
              <Button uppercase className={styles.header__btn}>
                {t('distinationBtn')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className={styles.looking__for}>
        <Container fluid px={20}>
          <h2 className="text-[#3a3a3a] text-2xl sm:text-6xl uppercase mb-6">
          {t('discoverDistance')}
          </h2>
          <Grid
            className={styles.grid__container}
            
            columns={10}
          >
            {
              catalog.map((item)=>{
                return(
                  <Col span={2} key={item.id}   className={styles.grid__grid}>
                  <Link href={`/whereToGo/${item.id}`}>
                    <div className={`${styles.grid__item} cursor-pointer `}>
                      {(
                        <Image
                        className={styles.imgLook}
                          src={item.img_collection.responsive_urls[0]}
                          fill
                         srcSet={item.img_collection.responsive_urls}
                         loading="lazy" decoding="async"
                         sizes='100%'
                          alt={item.name[locale]}
                        />
                      ) || <Skeleton />}
                      <h3>{item.name[locale]}</h3>
                    </div>
                  </Link>
                </Col>
                )
                 
                
              })
            }
             
          </Grid>
          <div className={styles.see__more}>
            <Link href={'/whatToDo'}>
              <Button uppercase className={styles.btn}>
              {t('exploreMoreBtn')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <Container fluid px={20}>
        <section>
          {
            blogs.map((item ,i)=>  
            <HomeCard
            key={i}
              title={item.title[locale]}
              image={item.img_collection.responsive_urls}
              id={item.id}
              t={t}
              reverse={(i % 2) == 0 ?"" :"true"}
            />
          )
          }
         
          
         
        </section>
      </Container>



      <Container fluid px={20}>
        <div className={styles.know__more}>
          <h2 className="text-2xl sm:text-5xl font-extrabold mb-6">
          {t('wannaKnowMore')}
          </h2>
          <Link href="/about">
            <Button size="xl" uppercase className={styles.btn}>
            {t('readNowBtn')}
            </Button>
          </Link>
        </div>
      </Container>
      <section className={styles.footer}>
        <a className={styles.footer_logo}>
          <Image src={Logo} alt="logo"></Image>
        </a>
      </section>
      </main>
    </>
  )
}




export async function getStaticProps (context)  {
  const blogs = await fetch('https://admin.marina.com.eg/api/data/blogs?id=2').then(
    (res) => res.json()
  );

  const url = new URL(
    "https://admin.marina.com.eg/api/data/catalog_types"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Language": "en",
};
  const res = await  fetch(url, {
    method: "GET",
    headers,
});
const catalog = await res.json()
  return {
    props: {
      catalog,
      blogs,
      ...(await serverSideTranslations(context.locale, ['home', 'common'])),
    },
  }
}