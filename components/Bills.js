"use client";
import React, { useEffect, useState } from "react";
import { getServices, getUserBills } from "./useApi/dataApi";
import { useRouter } from "next/router";
import NewService from "./newService/NewService";
import styles from "@/styles/services.module.scss";
import { Pagination, SegmentedControl } from "@mantine/core";
function bills({ t }) {
  const [Services, setServices] = useState([]);
  const [Bills, setBills] = useState([]);
  const { locale } = useRouter();
  const [typeInvoices, setTypeInvoices] = useState("paid");
  const [pageNum, setPageNum] = useState(1);
  console.log(pageNum);
  useEffect(() => {
    FetchDataBills();
  }, [pageNum]);
  useEffect(() => {
    FetchDataServices();
  }, []);

  const FetchDataServices = async () => {
    const Services = await getServices();
    if (!Services) console.log(Services?.message);
    setServices(Services);
    console.log(Services);
    console.log("Services");
  };
  const FetchDataBills = async () => {
    const Bills = await getUserBills(pageNum, locale);
    if (!Bills) console.log(Bills?.message);
    console.log(Bills);
    setBills(Bills);
    console.log("Bills");
  };

  return (
    <>
      {Bills?.data?.length ? (
        <div className={styles.pastreq} id="InvoicesDetails">
          <div className="filterInvoices">
            <SegmentedControl
              color="blue"
              size="md"
              radius="md"
              value={typeInvoices}
              onChange={setTypeInvoices}
              data={[
                { label: "paid", value: "paid" },
                { label: "unpaid", value: "unpaid" },
              ]}
            />
          </div>

          <h2>{t("Past2")}</h2>
          <div className={styles.requests}>
            {Bills.data
              .filter((itemF) => itemF.status == typeInvoices)
              .map((item, i) => (
                <div value="customization" className={styles.alldata} key={i}>
                  <div className={styles.req}>
                    <p>{item.id}</p>
                    <p>{item.desc[locale]}</p>
                    <p>
                      {item.status === "unpaid"
                        ? locale === "en"
                          ? "unpaid"
                          : "غير مدفوع"
                        : locale === "en"
                        ? "paid"
                        : " مدفوع"}
                    </p>
                    <p>{new Date(item.updated_at).toLocaleDateString()}</p>
                    {item.status === "unpaid" ? (
                      <a
                        target="_blank"
                        href={
                          item.id
                            ? `https://admin.marina.com.eg/payment/${item.id}`
                            : ""
                        }
                        className="btnPay"
                      >
                        {t("pay")}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
          <div className="boxPagination">
            <Pagination
              onChange={(e) => {
                setPageNum(e);
              }}
              total={Bills.last_page}
            />
          </div>
        </div>
      ) : (
        <NewService t={t} data={Services} />
      )}
    </>
  );
}

export default bills;
