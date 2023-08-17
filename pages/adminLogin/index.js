import PageUser from "@/components/PageUser";
import React, { useState } from "react";
import styles from "@/styles/signin.module.scss";
import { PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import axios from "axios";

import Cookies from "js-cookie";
function index() {
  const { t } = useTranslation("sign");
const {locale ,push} = useRouter();
const [email, setemail] = useState("saifallax@yahoo.com");
  const [password, setpassword] = useState("password");

  
  const handellogin = () => {
    console.warn(email, password);

    const po = axios
      .post(
        "https://admin.marina.com.eg/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: " application/json",
            "Accept-Language": `${locale}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
         push("/")
         Cookies.set("access_token",res.data.access_token);

        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };


  return (
    <section className={styles.sign}>
      <PageUser title="ADMIN LOGIN">
        <div className=" container mt-[24px] md:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row">
          <h1>ADMIN LOGIN</h1>
          <form>
            <div>
              <div className="mt-2">
                <TextInput label={t("username")} radius="xs"   onChange={(e) => setemail(e.target.value)} />
              </div>

              <div className={styles.pass}>
                <div className="mt-2 ">
                  <PasswordInput
                    label={t("password")}
                    radius="xs"
                    variant="unstyled"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.btnSign}  onClick={(e) => {
                  e.preventDefault();
                  handellogin();
                }}>
              {t("signin")}
            </button>
            <div className={styles.SignLinks}>
             
              <Link href={"/pass_reset"}>{t("forget")}</Link>
            </div>
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
