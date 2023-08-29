import React, { useEffect, useState } from "react";
import styles from "@/styles/layout.module.scss";
import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import Logo from "../../../public/images/navbar/logo.png";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

const useful_links = [
  { href: "/", title: { en: "HOME", ar: "الصفحة الرئيسية" } },
  { href: "/about", title: { en: "ABOUT MARINA", ar: " عن مرينا" } },
  { href: "/mangment", title: { en: "THE BOARD", ar: "مجلس الأدارة" } },
  { href: "/guide", title: { en: "OWNERS GUIDE", ar: "دليل الملاك" } },
  {
    href: "/whatToDo",
    title: { en: "WHAT TO DO?", ar: "تعمل أيه في مارينا؟" },
  },
  {
    href: "/whats_happening",
    title: { en: "WHAT'S HAPPENING?", ar: "ايه اللي بيحصل؟" },
  },
  { href: "/whereToGo", title: { en: "WHERE TO GO?", ar: "تروح فين؟" } },
];

const where_links = [
  { href: "/restaurants", title: "Restaurants" },
  { href: "/beaches", title: "Beaches and Water Activites" },
  { href: "/hotels", title: "Hotels & Rentals" },
  { href: "/healthcare", title: "Healthcare" },
  { href: "/water_activites", title: "Water Activites" },
];

const headOne = { ar: "صفحات مفيدة", en: "USEFUL LINKS" };
const headTwo = { ar: "تروح فين.", en: "WHERE TO GO?" };

const Index = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://admin.marina.com.eg/api/data/catalog_types",
    fetcher
  );
  const { locale } = useRouter();
  if (error) return <div>failed to load</div>;
  else if (data)
    return (
      <div className={styles.footer}>
        <div className={styles.footer__container} fluid="true" px={20}>
          <div className="flex items-center flex-wrap justify-around gap-2">
            <div className="">
              <a className={styles.logo} href="/">
                <Image
                  alt="Logo"
                  src={Logo}
                  style={{ maxWidth: "80%", margin: "auto" }}
                />
              </a>
            </div>
            <div className=" flex gap-5 md:gap-10">
              <div>
                <h3 className={styles.footer_links__title}>
                  {headOne[locale]}
                </h3>
                <ul>
                  {useful_links.map((link, i) => {
                    return (
                      <li key={i}>
                        <Link href={link.href} className={styles.footer_links}>
                          {link.title[locale]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className={styles.footer_links__title}>
                  {headTwo[locale]}
                </h3>
                <ul>
                  {data.map((item, i) => {
                    return (
                      <li key={i}>
                        <Link
                          href={`/whereToGo/${item.id}`}
                          className={styles.footer_links}
                        >
                          {item.name[locale]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={`${styles.last__item} `}>
              <Link href="/login" className={styles.user}>
                <span className="text-[12px] md:text-xl lg:text-2xl text-white font-bold flex items-center flex-col">
                  <AiOutlineUser className="text-3xl md:text-8xl mb-4" />
                  OWNERS LOGIN
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Index;
