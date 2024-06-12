import { Navbar } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "@/styles/layout.module.scss";
import Hamburger from "./Hamburger";
import SocialLinks from "./SocialLinks";
import Logo from "../../../public/images/navbar/logo.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { navState } from "@/atoms";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Index = ({ colorr, pos }) => {
  const [isNavOpen, setIsNavOpen] = useRecoilState(navState);

  const { locale } = useRouter();
  const UserLinks = [
    { href: "/services", title: { en: "DASHBOARD", ar: " لوحه التحكم" } },
    { href: "/services", title: { en: "SERVICES", ar: " الخدمات" } },
    { href: "/Invoices", title: { en: "INVOICES", ar: " الفواتير" } },
  ];

  const navLinks=[
    { href: "/", title: { en: "HOME", ar: "الصفحة الرئيسية" } },
    { href: "/about", title: { en: "ABOUT MARINA", ar: " عن مرينا" } },
    { href: "/mangment", title: { en: "THE BOARD", ar: "مجلس الأدارة" } },
    { href: "/guide", title: { en: "OWNERS GUIDE", ar: "دليل الملاك" } },
    {
      href: "/whatToDo",
      title: { en: "WHAT TO DO?", ar: "تعمل أيه في مارينا؟" },
    },
    { href: "/whereToGo", title: { en: "WHERE TO GO?", ar: "تروح فين؟" } },
    { href: "/complaints", title: { en: "COMPLAINTS", ar: " الشكاوي" } },
    { href: "/lost-found", title: { en: "LOST-FOUND", ar: " العثور على المفقودات" } },
  ];
  const [NavPage, setNavPage] = useState(navLinks);

  const [stateUser, setstateUser] = useState(
    Cookies.get("access_token") ? true : false
  );
  useEffect(()=>{
    stateUser? setNavPage(prevUsers => [...prevUsers, ...UserLinks]): setNavPage(navLinks)
  },[stateUser])

  return (
    <Navbar
      mt={20}
      px={20}
      className={styles.navbar}
      style={colorr && pos && { backgroundColor: colorr, position: pos }}
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
          {NavPage.map((link, i) => {
            return (
              <li key={i}>
                <Link
                  href={link.href}
                  className={styles.item}
                  onClick={() => setIsNavOpen(false)}
                >
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
