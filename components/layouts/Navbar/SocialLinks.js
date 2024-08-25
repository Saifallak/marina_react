import React, { useEffect, useState } from "react";
import styles from "@/styles/layout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";

const SocialLinks = ({ closeNav }) => {
  const router = useRouter();
  const { locale, locales, push } = router;

  const handelChangeLanguage = () => {
    push(`${router.asPath}`, `${router.asPath}`, {
      locale: locale === "en" ? "ar" : "en",
    });
  };
  const [opened,setopened] = useState(false)

  useEffect(()=>{
    setopened(Cookies.get("access_token") ? true:false)
  },[opened])

  return (
    <ul className={styles.social__links}>
      <li className={styles.social__item}>
        <a className={styles.social__link} href="tel://%3C15045%3E">
          <FontAwesomeIcon icon={faPhone} color="white" />
        </a>
      </li>
      <li className={styles.social__item}>
        <a
          className={styles.social__link}
          href="https://www.instagram.com/marinanorthcoast.official"
        >
          <FontAwesomeIcon icon={faInstagram} color="white" />
        </a>
      </li>
      <li className={styles.social__item}>
        <a
          className={styles.social__link}
          href="https://www.facebook.com/MarinaNorthCoast.Official/"
        >
          <FontAwesomeIcon icon={faFacebook} color="white" />
        </a>
      </li>
      <li className={styles.social__item}>
        {opened ? (
          <Link
            className={styles.social__link}
            href="/signin"
            onClick={() => {
              Cookies.remove("access_token");
              closeNav();
            }}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
          </Link>
        ) : (
          <Link className={styles.social__link} href="/signin" onClick={closeNav}>
            <FontAwesomeIcon icon={faUser} color="white" />
          </Link>
        )}
      </li>
      <li className={styles.social__item}>
        <button
          className="text-xl font-extrabold text-white"
          onClick={handelChangeLanguage}
        >
          {locale === "en" ? "ar" : "en"}
        </button>
      </li>
    </ul>
  );
};

export default SocialLinks;
