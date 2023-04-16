import PageUser from "@/components/PageUser";
import React from "react";
import styles from "@/styles/signin.module.scss";
import { PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
function index() {
  const { t } = useTranslation("sign");
  return (
    <section className={styles.sign}>
      <PageUser>
        <div className=" container mt-[24px] md:mt-[100px]  mx-auto flex justify-between items-stretch lg:items-center flex-col   lg:flex-row">
          <h1>{t("signin2")}</h1>
          <form>
            <div>
              <div className="mt-2">
                <TextInput label={t("username")} radius="xs" />
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
            </div>

            <button type="submit" className={styles.btnSign}>
              {t("signin")}
            </button>
            <div className={styles.SignLinks}>
              <Link href={"/signup"}>{t("signup")}</Link>
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
