"use client";
import React, { useEffect, useState } from "react";
import { getServices, getUserBills } from "./useApi/dataApi";
import { useRouter } from "next/router";
import NewService from "./newService/NewService";
import styles from "@/styles/services.module.scss";
import {
  Button,
  Modal,
  Pagination,
  ScrollArea,
  SegmentedControl,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
function bills({ t }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [Services, setServices] = useState([]);
  const [Bills, setBills] = useState([]);
  const [BillOne, setBillOne] = useState();
  const [BillID, setBillID] = useState();
  const { locale } = useRouter();
  const [typeInvoices, setTypeInvoices] = useState("paid");
  const [pageNum, setPageNum] = useState(1);
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
  };
  const FetchDataBills = async () => {
    const Bills = await getUserBills(pageNum, locale);
    if (!Bills) console.log(Bills?.message);
    setBills(Bills);
  };
  useEffect(() => {
    if (Bills?.data?.length) {
      setBillOne(Bills.data.filter((item) => item.id === BillID));
    }
  }, [BillID]);
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
                <div
                  value="customization"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalLong"
                  className={styles.alldata}
                  onClick={() => {
                    setBillID(item.id);
                    open();
                  }}
                  key={i}
                >
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
      {BillOne?.length > 0 ? (
        <Modal
          centered
          size="xl"
          opened={opened}
          onClose={close}
          title={`invoices ${BillOne[0].id}`}
          scrollAreaComponent={ScrollArea.Autosize}
          className="boxModal"
        >
          <div className="partModal">
            <ul>
              <li>
                <h3>title:</h3>
                <p>{BillOne[0].desc[locale]}</p>
              </li>
              <li>
                <div className="parts">
                  <div className="part">
                    <h3>created at:</h3>
                    <p>
                      {new Date(BillOne[0].created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="part">
                    <h3>finished at:</h3>
                    <p>{BillOne[0].payment_date}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="parts">
                  <div className="part">
                    <h3>Status:</h3>
                    <p>{BillOne[0].status}</p>
                  </div>
                  <div className="part">
                    <h3>total_amount:</h3>
                    <p>{BillOne[0].total_amount} EGP</p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="partPay">
            {BillOne[0].status === "unpaid" ? (
                      <a
                        target="_blank"
                        href={
                          BillOne[0].id ? `https://admin.marina.com.eg/payment/${BillOne[0].id}` : ""
                        }
                        className="btnPay"
                      >
                        {t("pay")}
                      </a>
                    ) : null}
            </div>
            
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default bills;
