import { Navbar } from "@mantine/core";
import React from "react";
import styles from "@/styles/layout.module.scss";
import Hamburger from "./Hamburger";
import SocialLinks from "./SocialLinks";
import Logo from "../../../public/images/navbar/logo.svg";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { navState } from "@/atoms";
import Link from "next/link";
import { useRouter } from "next/router";


const navLinks = [
  { href: "/", title: {en:"HOME" , ar:"الصفحة الرئيسية"} },
  { href: "/about", title: {en:"ABOUT MARINA" , ar:" عن مرينا"} },
  { href: "/mangment", title: {en:"THE BOARD", ar:"مجلس الأدارة"} },
  { href: "/guide", title: {en:"OWNERS GUIDE" , ar:"دليل الملاك"} },
  { href: "/whatToDo", title: {en:"WHAT TO DO?" , ar:"تعمل أيه في مارينا؟"} },
  { href: "/whats_happening", title: {en:"WHAT'S HAPPENING?" , ar:"ايه اللي بيحصل؟"} },
  { href: "/whereToGo", title: {en:"WHERE TO GO?" , ar:"تروح فين؟"} },
];

const Index = ({colorr ,pos}) => {
  const [isNavOpen, setIsNavOpen] = useRecoilState(navState);

const {locale} = useRouter();

  return (
    <Navbar
      mt={20}
      px={20}
      className={styles.navbar}
      style={colorr&&pos&&{backgroundColor:colorr,position:pos}}
      height={64}
    >
      <Hamburger />
      <Link href="/" className={styles.logo}>
       
          <Image alt="Logo" src={Logo} />
       
      </Link>
      <SocialLinks />
      <div
        style={isNavOpen ? { top: "0" } : { top: "-150%" }}
        className={styles.nav__menu}
      >
      
        <ul className={styles.list}>
          {navLinks.map((link, i) => {
            return (
              <li key={i}>
                <Link href={link.href}  className={styles.item} onClick={() => setIsNavOpen(false)}>
                  
                    {link.title[locale]}
                  
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Navbar>
  );
};

export default Index;

