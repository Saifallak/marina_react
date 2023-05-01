import React from "react";
import Navbar from "./layouts/Navbar/index";
import icon from '@/public/images/icon.png'
import Head from "next/head";
function PageUser(props) {
  return (
    <>
      <Head>
    <title>{props.title} </title>
        <meta name="description" content={props.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
    </Head>
      <Navbar colorr={"#0CCEFF"} pos={"relative"} />
      {props.children}
    </>
  );
}

export default PageUser;
