import PageUser from '@/components/PageUser'
import { Accordion } from '@mantine/core'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import styles from "@/styles/dash.module.scss";
import { useRouter } from 'next/router';

function index({  userDate }) {
    const { t } = useTranslation("services");
    const { locale } = useRouter();
  return (
    
    <PageUser>
        <div className={styles.dash}>

        
       <div className={styles.dashHead} style={{paddingBottom:"70px"}}>
        <h1>INVOICES</h1>
        <div className='container mx-auto'>

       
        <div className={styles.NumReq}>
            <h2>SERVICE REQUEST</h2>
            <div className={styles.parts}>
                <div className={styles.part}>
                    <h3>5</h3>
                    <p>PENDING INVOICES</p>
                </div>
                <div className={styles.part}>
                    <h3>23</h3>
                    <p>PAID INVOICES</p>
                </div>
                <div className={styles.part}>
                    <h3>28</h3>
                    <p>TOTAL INVOICES</p>
                </div>
            </div>
        </div>
       </div>
       <button>CREATE INVOICE</button>
       </div>
<div className={styles.pastreq}>
   
    <div className={styles.head}>
    <h2>
    Invoices
    </h2>
    <input type="search" placeholder='Search' />
    </div>
    <div className={styles.requests}>
              {userDate.map((item, i) => (
                <Accordion vvariant="filled" radius="xs" key={i}>
                  <Accordion.Item
                    value="customization"
                    className={styles.alldata}
                  >
                    <Accordion.Control>
                      <div className={styles.req}>
                        <p>{item.client_id}</p>
                        <p>{item.service.name[locale]}</p>
                        <p>
                          {item.status == 1
                            ? "SUBMITTED "
                            : item.status == 2
                            ? "ACCEPTED"
                            : item.status == 3
                            ? "IN_PROGRESS"
                            : item.status == 4
                            ? "CANCELED"
                            : "COMPLETED"}
                        </p>
                        <p>{new Date(item.updated_at).toLocaleDateString()}</p>
                      </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <div className={styles.his}>
                        {item.histories.length
                          ? item.histories.map((history, i) => (
                              <div className={styles.req} key={i}>
                                <p>{item.client_id}</p>
                                <p>{item.service.name[locale]}</p>
                                <p>
                                  {history.status == 1
                                    ? "SUBMITTED "
                                    : history.status == 2
                                    ? "ACCEPTED"
                                    : history.status == 3
                                    ? "IN_PROGRESS"
                                    : history.status == 4
                                    ? "CANCELED"
                                    : "COMPLETED"}
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
              ))}
            </div>
            <button className={styles.btn}>VIEW MORE</button>
</div>
</div>
    </PageUser>
  )
}

export default index



export async function getServerSideProps({ req, locale }) {

  
    let headers = {
      Authorization: `Bearer ${req.cookies.access_token} `,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
    };
  
    const url = new URL("https://admin.marina.com.eg/api/auth/requests");

    const user = await fetch(url, {
      method: "GET",
      headers,
    });
  
    const userDate = await user.json();
  
   
  
    return {
      props: {   
        userDate,
        ...(await serverSideTranslations(locale, ["services", "common"])),
      },
    };
  }
  