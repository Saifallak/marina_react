import React from "react";
import Footer from "@/components/layouts/Footer/Index";
import ProgressiveImage from "react-progressive-graceful-image";
import Navbar from "./layouts/Navbar/index";
import Head from "next/head";
import icon from '../public/Icon.png'

const PageComponent = (props) => {
  
  return (
    <>
    <Head>
    <title>{props.title} </title>
        <meta name="description" content={"marina"+" "+props.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
    </Head>
      <Navbar />
      <section
        className="page__header md:!max-h-[500px] !max-h-[300px] "
        style={{ maxHeight: "100vh", overflow: "hidden" }}
      >
        <ProgressiveImage src={props.hero} placeholder="loading">
          {(src, loading) => (
            <img
              className={`image${loading ? " loading" : " loaded"}`}
              src={src}
              alt="sea beach"
              width="100%"
              height="100%"
            />
          )}
        </ProgressiveImage>
       { props.over ? null: <div className="page__overlay"></div>}
        <div className="flex-col page__hero__content">
          <h1 className="page__title">{props.title}</h1>
          {props.button && (
            <div className="LinkPdf flex gap-2 md:gap-8 flex-wrap">

             { props.link && props.pdf.map((pdfItem)=>{
                return (
                  
                   <a
                  key={pdfItem.id}
              href={pdfItem.pdf}
              className="text-white text-[11px] md:text-lg font-bold bg-[#0cceff] mt-3 md:mt-6 p-2 md:p-4 px-3 md:px-6 rounded-2xl"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              {pdfItem.name}
            </a>
                 
                )
              }) }           
           
           </div>
          )}
        </div>
      </section>
      <div>
        {props.children}
        <Footer></Footer>
      </div>
    </>
  );
};

export default PageComponent;