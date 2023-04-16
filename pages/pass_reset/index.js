import PageUser from "@/components/PageUser";
import React from "react";
import styles from "@/styles/signin.module.scss";
import { NumberInput, TextInput } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function index() {
  const { t } = useTranslation("sign");
  return (
    <section className={styles.sign}>
      <PageUser>
        <div className=" container mt-[24px] md:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row	">
          <h1 className="!max-w-[850px]">{t("reset")}</h1>
          <form>
            <div>
              <div className="mt-2 ">
                <TextInput label={t("email")} radius="xs" />
              </div>
              <div className="mt-2 ">
                <NumberInput label={t("unit")} radius="xs" hideControls />
              </div>
            </div>

            <button type="submit" className={styles.btnSign}>
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
