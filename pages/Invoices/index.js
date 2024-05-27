import PageUser from "@/components/PageUser";
import NewService from "@/components/newService/NewService";
import React from "react";
import styles from "@/styles/services.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
function index({ userDate, userAuth ,data }) {
  const Number_InPROGRESS = userDate.filter((item) => item.status === "unpaid");
  const userSum = userDate.reduce(
    (total, number) => total + number.remaining_amount,
    0
  );
console.log('====================================');
console.log(userDate);
console.log('====================================');
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  const formattedNumber = new Intl.NumberFormat().format(userSum);

  const { locale } = useRouter();
  const stringToArray = (str) => str.split(" ");
  const { t } = useTranslation("services");
  return (
    <div className={styles.services}>
      <PageUser title={t("invoices")}>
        <h1>{t("welcome") + " " + userAuth.name}</h1>
        <div className="container mx-auto">
          <div className={styles.boxs}>
            <div className={styles.box2}>
              <h2>
                {t("hello")}
                <br />
                {t("pleasure")}
                <br />
                {stringToArray(userAuth.name)[0] +
                  " " +
                  stringToArray(userAuth.name)[1]}
              </h2>
            </div>
            <div className={styles.box}>
              <h3>EGP {formatNumber(userSum)}</h3>
              <p> {t("amount")}</p>
              <Link href="#InvoicesDetails">{t("payNow")}</Link>
            </div>
            <div className={styles.box}>
              <h3>{Number_InPROGRESS.length}</h3>
              <p>{t("amount2")}</p>
              <Link href="#InvoicesDetails">{t("view")}</Link>
            </div>
          </div>

          {userDate.length ? (
            <div className={styles.pastreq} id="InvoicesDetails">
              <h2>{t("Past")}</h2>
              <div className={styles.requests}>
                {userDate.map((item, i) => (
                  <Link
                    href={item.id ? `https://admin.marina.com.eg/payment/${item.id}` : ""}
                    target="_blank"
                    value="customization"
                    className={styles.alldata}
                    key={i}
                  >
                    <div className={styles.req}>
                      <p>{item.id}</p>
                      <p>{item.desc[locale]}</p>
                      <p>{item.status==="unpaid"? locale==="en"? "unpaid" : "غير مدفوع" : locale==="en"? "paid" : " مدفوع" }</p>
                      <p>{new Date(item.updated_at).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <NewService t={t} data={data}  />
          )}
        </div>
      </PageUser>
    </div>
  );
}

export default index;
export async function getServerSideProps({ req, locale }) {
  let headers = {
    Authorization: `Bearer ${req.cookies.access_token} `,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": `${locale}`,
  };

  const url = new URL("https://admin.marina.com.eg/api/auth/bills");
  const user = await fetch(url, {
    method: "GET",
    headers,
  });

  const userDate = await user.json();

  const urlUser = new URL("https://admin.marina.com.eg/api/auth/user");
  const userauth = await fetch(urlUser, {
    method: "GET",
    headers,
  });

  const userAuth = await userauth.json();
  const res = await fetch(`https://admin.marina.com.eg/api/data/services`);
  const data = await res.json();
  return {
    props: {
      data,
      userDate,
      userAuth,
      ...(await serverSideTranslations(locale, ["services", "common"])),
    },
  };
}
