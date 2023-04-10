import { Container, Button, Grid } from '@mantine/core';
import React from 'react';
import styles from '@/styles/whatHappening.module.scss';
import PageComponent from '@/components/PageComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import img from '@/public/Images/whatsHappening/linus-nylund-UCIZh0-OYPw-unsplash.jpg';
import WhatHappeinineCard from '@/components/whatHappeninig/WhatHappeinineCard';

const Index = () => {
 const { t } = useTranslation('happening');

  return (
    <>
      <PageComponent styles={styles} title={t('happening')} hero={img.src}>
        <section className={styles.sectionOne}>
          <div className="container px-4 mx-auto sm:px-10 mt-11">
            <WhatHappeinineCard
              image="/Images/whatsHappening/christopher-burns-8KfCR12oeUM-unsplash.jpg"
              titleOne="CONSTRUCTION"
              titleTwo="UPDATES"
              t={t}
            />
            <WhatHappeinineCard
              image="/Images/whatsHappening/icons8-team-m0oSTE_MjsI-unsplash.jpg"
              titleOne="MARINA CO"
              titleTwo="2021 PERFORMANCE"
              t={t}
            />
            <WhatHappeinineCard
              image="/Images/whatsHappening/luis-vidal-SDEb1se-lLA-unsplash.jpg"
              titleOne="BEACHES"
              titleTwo="ARE READY"
              t={t}
            />

            <p className="font-extrabold text-center lg:text-3xl">
              No more data
            </p>
          </div>
        </section>
      </PageComponent>
    </>
  );
};

export default Index;


export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'happening',
        'common',
      ])),
    },
  };
};