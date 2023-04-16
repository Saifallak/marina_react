import PageUser from "@/components/PageUser";
import React from "react";
import styles from "@/styles/signin.module.scss";
import { NumberInput } from "@mantine/core";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
function index() {
  const { t } = useTranslation("sign");
  return (
    <section className={styles.sign}>
      <PageUser>
        <div className=" container mt-[24px] md:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row-reverse	">
          <h1>{t("signup")}</h1>
          <form>
            <div>
              <div className="mt-2">
                <NumberInput label={t("unit")} radius="xs" hideControls />
              </div>

              <div className="mt-2 ">
                <NumberInput label={t("phone")} radius="xs" hideControls />
              </div>
            </div>

            <button type="submit" className={styles.btnSign}>
              {t("signup")}
            </button>
            <div className={styles.SignLinks}>
              <Link href={"/signin"}>{t("signin")}</Link>
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
