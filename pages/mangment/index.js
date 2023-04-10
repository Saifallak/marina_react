import { Button, Container, Grid } from '@mantine/core';
import React from 'react';
import styles from '@/styles/mangment.module.scss';
import img from '@/public/Images/mangment/jamie-street-gZlQZFCA1Vc-unsplash.png';
import PageComponent from '@/components/PageComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Index = () => {
 const { t } = useTranslation('mangment');
  return (
    <>
      <PageComponent styles={styles} title={t('mangment')} hero={img.src}>
        <span className="text-2xl sm:text-4xl md:text-8xl text-[#3a3a3a] font-extrabold text-center">
          <p className="mt-6 md:mt-[100px]  mb-11">{t('border')}</p>
        </span>
        <div className="container mx-auto">
          <div className={styles.CardOne}>
            <p>
              SAFWA <br></br>EL NAHAS{' '}
            </p>
          </div>
          <div className={styles.imgContainerTwo}>
            <div className="flex w-full gap-3 md:gap-5">
              <div className={styles.CardTwo}>
                <p>
                  MOHAMED
                  <br />
                  ABDELKADER
                  <br />
                  SALEM
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardThree}>
                <p>
                  SAMIR <br />
                  YOUSSEF <br />
                  EL SAIAD
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardFour}>
                {' '}
                <p>
                  HATEM <br />
                  MAHMOUD
                  <br />
                  HASSAN
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardFive}>
                <p>
                  HASSAN <br></br>
                  ISAMIL
                  <br></br>
                  GHANEM
                  <br />
                  (Board member)
                </p>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className={styles.CardSex}>
                <p>
                  MOHAMED
                  <br></br>
                  SAAD
                  <br></br>
                  EL SHERBINI
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardSeven}>
                <p>
                  IBRAHIM <br></br>
                  SABRY
                  <br></br>
                  ABDELHAMID
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardEight}>
                <p>
                  HASSAN <br></br>
                  ISAMIL
                  <br></br>
                  GHANEM
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardNine}>
                <p>
                  MOHAMED
                  <br></br>
                  ABDELFATAH
                  <br></br>
                  EL GAMAL
                  <br />
                  (Board member)
                </p>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className={styles.CardTen}>
                <p>
                  ASHRAF
                  <br></br>
                  EL SAMALIGI
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardEleven}>
                <p>
                  ABDELAAL <br></br>
                  EL SHEIKH
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardTwelve}>
                <p>
                  ABDELHAMID
                  <br></br>
                  MOHAMED
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardThirteen}>
                <p>
                  WALID <br></br>
                  ABBAS
                  <br />
                  (Board member)
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-[52%]">
              <div className={styles.CardFourteen}></div>
              <div className={styles.CardFifteen}>
                <p>
                  AHMED <br></br>
                  ABDELAZIZ
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardSixteen}>
                <p>
                  AbdelAl
                  <br></br>
                  Ali AbdelAl
                  <br />
                  (Board member)
                </p>
              </div>
              <div className={styles.CardSeventeen}></div>
            </div>
          </div>
        </div>
      </PageComponent>
    </>
  );
};

export default Index;


export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['mangment', 'common'])),
    },
  };
};