import PageUser from "@/components/PageUser";
import React, { useState } from "react";
import styles from "@/styles/signin.module.scss";
import {  TextInput } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

function index() {
  const { t } = useTranslation("sign");
  const [email, setemail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { locale } = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(email);
    if (!isValidEmail) {
      setEmailError(t("Invalid email format")); 
      return;
    }

    setEmailError(""); 

    axios
      .post(
        "https://admin.marina.com.eg/api/auth/reset",
        { 
          email: email,
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("access_token")}`,
            "Content-Type": "application/json",
            Accept: " application/json",
            "Accept-Language": `${locale}`,
          },
        }
      )
      .then((res) => {

      })
      .catch((res) => {

            });
  };
  return (
    <section className={styles.sign}>
      <PageUser title={t("reset")}>
        <div className=" container mt-[24px] md:mt-[100px] mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row ">
          <h1 className="!max-w-[850px]">{t("reset")}</h1>
          <form onSubmit={handleLogin}>
            <div>
              <div className="mt-2">
                <TextInput
                  label={t("email")}
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  radius="xs"
                />
                {emailError && (
                  <p className="text-red-500  mt-[-30px]">{emailError}</p>
                )}
              </div>
            </div>

            <button type="submit"  className={styles.btnSign}>
              {t("btnreset")}
            </button>
          </form>
        </div>
      </PageUser>
    </section>
  );
}

export default index;

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["sign", "common"])),
    },
  };
};
