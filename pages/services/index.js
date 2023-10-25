import PageUser from "@/components/PageUser";
import NewService from "@/components/newService/NewService";
import React, { useEffect, useState } from "react";
import styles from "@/styles/services.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Accordion, Skeleton } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  getServices,
  getUserAuth,
  getUserDate,
} from "@/components/useApi/dataApi";

function index() {
  const [TypeFilter, setTypeFilter] = useState(null);
  const [userDate, setUserDate] = useState([]);
  const [UserAuth, setUserAuth] = useState();
  const [DateFilter, setDateFilter] = useState(userDate);
  const [data, setData] = useState([]);
  const [Load1, setLoad1] = useState(false);
  const [Load2, setLoad2] = useState(false);

  const Number_InPROGRESS =
    userDate.length > 0 ? userDate.filter((item) => item.status === 3) : [];
  const Number_Completed =
    userDate.length > 0 ? userDate.filter((item) => item.status === 5) : [];
  const { locale } = useRouter();
  const stringToArray = (str) => str.split(" ");
  const { t } = useTranslation("services");

  useEffect(() => {
    FetchDataOFServices();
    FetchDataOFUserDate();
    FetchDataOFUserAuth();
  }, []);
  const FetchDataOFServices = async () => {
    setLoad2(true);
    setLoad1(true);
    const Services = await getServices();
    if (!Services) console.log(Services?.message);
    console.log(Services);
    setLoad2(false);
    setLoad1(false);
    setData(Services);
  };
  const FetchDataOFUserDate = async () => {
    const UserDate = await getUserDate();
    if (!UserDate) console.log(UserDate?.message);
    console.log(UserDate);
    setUserDate(UserDate);
  };
  const FetchDataOFUserAuth = async () => {
    const UserAuth = await getUserAuth();
    if (!UserAuth) console.log(UserAuth?.message);
    console.log(UserAuth);
    setUserAuth(UserAuth);
  };
  console.log();
  return (
    <div className={styles.services}>
      <PageUser title={t("services")}>
        <h1>{t("services") + " " + UserAuth?.name} </h1>
        <div className="container mx-auto">
          <div className={styles.boxs}>
            <div className={styles.box2}>
              <h2>
                {t("hello")}
                <br />
                {t("serve")}
                <br />
                {UserAuth?.id ? stringToArray(UserAuth.name)[0] : null}
              </h2>
            </div>
            <div className={styles.box}>
              <h3>{Number_Completed.length}</h3>
              <p> {t("completed")}</p>
              <Link
                href="#ser"
                onClick={() => {
                  setTypeFilter(5);
                }}
              >
                {t("view")}{" "}
              </Link>
            </div>
            <div className={styles.box}>
              <h3>{Number_InPROGRESS.length}</h3>
              <p>{t("progress")}</p>
              <Link
                href="#ser"
                onClick={() => {
                  setTypeFilter(3);
                }}
              >
                {t("view")}
              </Link>
            </div>
          </div>
          {TypeFilter ? (
            <div id="ser" className={styles.pastreq}>
              <h2>{t("Past")}</h2>
              <div className={styles.requests}>
                {userDate?.filter((item) => item.status == TypeFilter).length >
                0 ? (
                  userDate
                    .filter((item) => item.status == TypeFilter)
                    .map((item, i) => (
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
                                  ? locale === "en"
                                    ? "SUBMITTED "
                                    : "مقدم"
                                  : item.status == 2
                                  ? locale === "en"
                                    ? "ACCEPTED"
                                    : "قبلت"
                                  : item.status == 3
                                  ? locale === "en"
                                    ? "IN_PROGRESS"
                                    : "قيد التنفيذ"
                                  : item.status == 4
                                  ? locale === "en"
                                    ? "CANCELED"
                                    : "ملغي"
                                  : locale === "en"
                                  ? "COMPLETED"
                                  : "اكتمل"}
                              </p>
                              <p>
                                {new Date(item.updated_at).toLocaleDateString()}
                              </p>
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
                                          ? locale === "en"
                                            ? "SUBMITTED "
                                            : "مقدم"
                                          : history.status == 2
                                          ? locale === "en"
                                            ? "ACCEPTED"
                                            : "قبلت"
                                          : history.status == 3
                                          ? locale === "en"
                                            ? "IN_PROGRESS"
                                            : "قيد التنفيذ"
                                          : history.status == 4
                                          ? locale === "en"
                                            ? "CANCELED"
                                            : "ملغي"
                                          : locale === "en"
                                          ? "COMPLETED"
                                          : "اكتمل"}
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
                    ))
                ) : (
                  <p className="text-[20px] text-center font-bold md:text-[30px] ">
                    {locale === "en" ? "no date" : "لا يوجد بيانات"}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div id="ser" className={styles.pastreq}>
              <h2>{t("Past")}</h2>
              {Load2 && (
            <div className="loadDiv">
              <Skeleton height={100} width={"90%"} radius="8px" />
              <Skeleton height={100} width={"90%"} radius="8px" />
              <Skeleton height={100} width={"90%"} radius="8px" />
              <Skeleton height={100} width={"90%"} radius="8px" />
            </div>
          )}
              <div className={styles.requests}>
                {userDate?.length > 0 ? (
                  userDate.map((item, i) => (
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
                                ? locale === "en"
                                  ? "SUBMITTED "
                                  : "مقدم"
                                : item.status == 2
                                ? locale === "en"
                                  ? "ACCEPTED"
                                  : "قبلت"
                                : item.status == 3
                                ? locale === "en"
                                  ? "IN_PROGRESS"
                                  : "قيد التنفيذ"
                                : item.status == 4
                                ? locale === "en"
                                  ? "CANCELED"
                                  : "ملغي"
                                : locale === "en"
                                ? "COMPLETED"
                                : "اكتمل"}
                            </p>
                            <p>
                              {new Date(item.updated_at).toLocaleDateString()}
                            </p>
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
                                        ? locale === "en"
                                          ? "SUBMITTED "
                                          : "مقدم"
                                        : history.status == 2
                                        ? locale === "en"
                                          ? "ACCEPTED"
                                          : "قبلت"
                                        : history.status == 3
                                        ? locale === "en"
                                          ? "IN_PROGRESS"
                                          : "قيد التنفيذ"
                                        : history.status == 4
                                        ? locale === "en"
                                          ? "CANCELED"
                                          : "ملغي"
                                        : locale === "en"
                                        ? "COMPLETED"
                                        : "اكتمل"}
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
                  ))
                ) : (
                  <p className="text-[20px] text-center font-bold md:text-[30px] ">
                    {locale === "en" ? "no date" : "لا يوجد بيانات"}
                  </p>
                )}
              </div>
            </div>
          )}
          {Load1 && (
            <div className="loadDiv">
              <Skeleton height={300} width={"22%"} radius="8px" />
              <Skeleton height={300} width={"22%"} radius="8px" />
              <Skeleton height={300} width={"22%"} radius="8px" />
              <Skeleton height={300} width={"22%"} radius="8px" />
              <Skeleton height={300} width={"22%"} radius="8px" />
              <Skeleton height={300} width={"22%"} radius="8px" />
            </div>
          )}
          {data.length > 0 ? <NewService t={t} data={data} /> : null}
        </div>
      </PageUser>
    </div>
  );
}

export default index;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["services", "common"])),
    },
  };
}
