import PageUser from "@/components/PageUser";
import React from "react";
import styles from "@/styles/signin.module.scss";
import { NumberInput, PasswordInput, TextInput } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import img from "@/public/images/navbar/persone.png";
function index() {
  const { t } = useTranslation("sign");
  return (
    <section className={styles.sign}>
      <PageUser>
        <div className=" container mt-[24px] md:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row-reverse	">
          <h1>{t("signup")}</h1>
          <form className={styles.form3}>
            <div className={styles.div_img}>
              <img src={img.src} className={styles.img1} alt="persone" />
            </div>
            <div className="mt-2">
              <TextInput label={t("username")} radius="xs" />
            </div>
            <div className="mt-2 ">
              <TextInput label={t("email")} radius="xs" />
            </div>
            <div className={styles.pass}>
              <div className="mt-2 ">
                <PasswordInput
                  label={t("password")}
                  radius="xs"
                  variant="unstyled"
                />
              </div>
            </div>
            <div className="mt-2 ">
              <NumberInput label={t("date")} radius="xs" hideControls />
            </div>

            <div className="mt-2">
              <TextInput label={t("gender")} radius="xs" />
            </div>

            <div className="mt-2 ">
              <NumberInput label={t("national")} radius="xs" hideControls />
            </div>

            <button type="submit" className={styles.btnSign}>
              {t("confirm")}
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
