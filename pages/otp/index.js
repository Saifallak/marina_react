import PageUser from "@/components/PageUser";
import React from "react";
import styles from "@/styles/signin.module.scss";
import { NumberInput } from "@mantine/core";
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
              <div className="mt-2 text-center">
                <NumberInput label={t("otp")} radius="xs" hideControls />
              </div>
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
