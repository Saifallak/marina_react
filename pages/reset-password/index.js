import PageUser from "@/components/PageUser";
import React, { useState } from "react";
import styles from "@/styles/signin.module.scss";
import { NumberInput, PasswordInput, TextInput } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

function index() {
  const { t } = useTranslation("sign");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ErrorPassword, setErrorPassword] = useState("");
  const [ErrorConfirmPassword, setErrorConfirmPassword] = useState("");
  const { locale } = useRouter();
  const router = useRouter();
  const { token, email } = router.query;
  
  const handellogin = () => {
    const po = axios
      .post(
        "https://admin.marina.com.eg/api/auth/reset-password",
        {
            email: email,
            password: Password,
            password_confirmation: ConfirmPassword,
            token: token
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("access_token")}`,
            "Content-Type": "application/json",
            "Accept": " application/json",
            "Accept-Language": `${locale}`,
          },
        }
      )
      .then((res) => {
       
        console.log(res)
      })
      .catch((res) => {
       
        console.log(res)
      
      
       
       
      });
  };
  return (
    <section className={styles.sign}>
      <PageUser>
        <div className=" container mt-[24px] md:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row	">
          <h1 className="!max-w-[850px]">{t("reset")}</h1>
          <form>
            <div>
              <div className="mt-2 ">
                <PasswordInput label="New Password" onChange={(e)=>setPassword(e.target.value)} radius="xs" />
              </div>
              <div className="mt-2 ">
                <PasswordInput label="Confirm New Password" onChange={(e)=>setConfirmPassword(e.target.value)} radius="xs" />
              </div>
            </div>

            <button type="submit" onClick={(e)=>{e.preventDefault(); handellogin()}} className={styles.btnSign}>
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
