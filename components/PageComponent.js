import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/layouts/Footer/Index';
import ProgressiveImage from 'react-progressive-graceful-image';
import axios from 'axios';
//className={router.locale === 'ar' ? 'rtl' : 'ltr'}
const PageComponent = (props) => {
  //const router = useRouter();
 /*<Image
             
              src={props.hero}
              srcSet={`${props.srcset}`}
              alt="sea beach"
              width="100"
              height="100"
            />*/ 
  return (
    <>
      <section
        className="page__header"
        style={{ maxHeight: '120vh', overflow: 'hidden' }}
      >
        {/* <img src= alt='' /> */}
        <ProgressiveImage src={props.hero} placeholder="loading">
          {(src, loading) => (
            <img
              className={`image${loading ? ' loading' : ' loaded'}`}
              src={src}
              alt="sea beach"
              width="100%"
              height="100%"
            />
          )}
        </ProgressiveImage>
        <div className="page__overlay"></div>
        <div className="flex-col page__hero__content">
          <h1 className="page__title">{props.title}</h1>
          {props.button && (
            <a
              href={props.link}
              className="text-white text-[11px] md:text-lg font-bold bg-[#0cceff] mt-3 md:mt-6 p-2 md:p-4 px-3 md:px-6 rounded-2xl"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the guide
            </a>
          )}
        </div>
      </section>
      <div >
        {props.children}
        <Footer ></Footer>
      </div>
    </>
  );
};

export default PageComponent;


