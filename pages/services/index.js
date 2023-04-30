import PageUser from "@/components/PageUser";
import NewService from "@/components/newService/NewService";
import React, { useEffect, useState } from "react";
import styles from "@/styles/services.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Accordion } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function index({ data, userDate, userAuth }) {
  const [TypeFilter ,setTypeFilter] = useState(null);
  const [DateFilter ,setDateFilter] = useState(userDate);
  
  const Number_InPROGRESS = userDate.filter((item) => item.status === 3);
  const Number_Completed = userDate.filter((item) => item.status === 5);
  const { locale } = useRouter();
  const stringToArray = (str) => str.split(" ");
  const { t } = useTranslation("services");
  useEffect(()=>{

    TypeFilter&&setDateFilter(DateFilter.filter((item)=>{ item.status == TypeFilter}))
  },[TypeFilter])
  return (
    <div className={styles.services}>
      <PageUser>
        <h1>{t("services") + " " + userAuth.name} </h1>
        <div className="container mx-auto">
          <div className={styles.boxs}>
            <div className={styles.box2}>
              <h2>
                {t("hello")}
                <br />
                {t("serve")}
                <br />
                {stringToArray(userAuth.name)[0]}
              </h2>
            </div>
            <div className={styles.box}>
              <h3>{Number_Completed.length}</h3>
              <p> {t("completed")}</p>
              <Link href="#ser" onClick={()=>{setTypeFilter(5)}}>{t("view")} </Link>
            </div>
            <div className={styles.box}>
              <h3>{Number_InPROGRESS.length}</h3>
              <p>{t("progress")}</p>
              <Link href="#ser" onClick={()=>{setTypeFilter(3)}}>{t("view")}</Link>
            </div>
          </div>

          <div id="ser" className={styles.pastreq}>
            <h2>{t("Past")}</h2>
            <div className={styles.requests}>
              {DateFilter.length ?  DateFilter.map((item, i) => (
                <Accordion vvariant="filled" radius="xs" key={i}>
                  <Accordion.Item
                    value="customization"
                    className={styles.alldata}
                  >
                    <Accordion.Control>
                      <div className={styles.req}>
                        <p>{item.id}</p>
                        <p>{item.service.name[locale]}</p>
                        <p>
                        {item.status == 1
                                    ? locale==="en"? "SUBMITTED " : "مقدم"
                                    : item.status == 2
                                    ? locale==="en"? "ACCEPTED" : "قبلت"
                                    : item.status == 3
                                    ? locale==="en"? "IN_PROGRESS" : "قيد التنفيذ"
                                    : item.status == 4
                                    ? locale==="en"? "CANCELED" : "ملغي"
                                    : locale==="en"? "COMPLETED" : "اكتمل"}
                        </p>
                        <p>{new Date(item.updated_at).toLocaleDateString()}</p>
                      </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <div className={styles.his}>
                        {item.histories.length
                          ? item.histories.map((history, i) => (
                              <div className={styles.req} key={i}>
                                <p>{history.id}</p>
                                <p>{item.service.name[locale]}</p>
                                <p>
                                {history.status == 1
                                    ? locale==="en"? "SUBMITTED " : "مقدم"
                                    : history.status == 2
                                    ? locale==="en"? "ACCEPTED" : "قبلت"
                                    : history.status == 3
                                    ? locale==="en"? "IN_PROGRESS" : "قيد التنفيذ"
                                    : history.status == 4
                                    ? locale==="en"? "CANCELED" : "ملغي"
                                    : locale==="en"? "COMPLETED" : "اكتمل"}
                                </p>
                                <p>
                                  {new Date(
                                    history.created_at
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            ))
                          : null}
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              )) : <p className="text-[20px] text-center font-bold md:text-[30px] ">{ locale === "en" ? "no date" : "لا يوجد بيانات"}</p>}
            </div>
          </div>
          <NewService t={t} data={data} />
        </div>
      </PageUser>
    </div>
  );
}

export default index;
export async function getServerSideProps({ req, locale }) {
  const res = await fetch(`https://admin.marina.com.eg/api/data/services`);
  const data = await res.json();

  let headers = {
    Authorization: `Bearer ${req.cookies.access_token} `,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": `${locale}`,
  };

  const url = new URL("https://admin.marina.com.eg/api/auth/requests");
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

  return {
    props: {
      data,
      userDate,
      userAuth,
      ...(await serverSideTranslations(locale, ["services", "common"])),
    },
  };
}
